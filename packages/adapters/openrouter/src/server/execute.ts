import type {
  AdapterExecutionContext,
  AdapterExecutionResult,
} from "@paperclipai/adapter-utils";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderPaperclipWakePrompt,
} from "@paperclipai/adapter-utils/server-utils";

import {
  OPENROUTER_GENERATION_ENDPOINT,
  type OpenRouterConfig,
} from "../index.js";
import { PaperclipApi } from "./paperclip-api.js";
import { loadSkills, renderSkillsForPrompt } from "./skills.js";
import {
  emitInit,
  emitAssistant,
  emitToolCall,
  emitToolResult,
  emitResult,
  emitSystem,
  writeRawStderr,
} from "./transcript.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, "../../cli/dist/index.js");

export async function execute(
  ctx: AdapterExecutionContext<OpenRouterConfig>
): Promise<AdapterExecutionResult> {
  const { wake, issueId, config, onLog, authToken } = ctx;

  const api = new PaperclipApi({ authToken });

  // 1. Set issue to in_progress
  try {
    await api.updateIssue(issueId, { status: "in_progress" });
  } catch (err) {
    emitSystem(onLog, `Failed to set issue to in_progress: ${err}`);
  }

  // 2. Build the prompt
  let prompt = "";
  try {
    const skills = await loadSkills(config);
    const renderedSkills = renderSkillsForPrompt(skills);
    const paperclipWake = renderPaperclipWakePrompt(wake, {
      supportsImages: false,
    });
    prompt = renderedSkills ? `${renderedSkills}\n\n${paperclipWake}` : paperclipWake;
  } catch (err) {
    emitSystem(onLog, `Error building prompt: ${err}`);
    await api.addIssueComment(issueId, { body: `Failed to build prompt: ${err}` });
    await api.updateIssue(issueId, { status: "blocked" });
    return { text: "", inputTokens: 0, outputTokens: 0 };
  }

  emitInit(onLog, { model: config.model || "anthropic/claude-3.5-sonnet", sessionId: issueId });

  // 3. Spawn openrouter-cli
  const cliArgs = [
    CLI_PATH,
    "--print",
    "--output-format", "stream-json",
    "--model", config.model || "anthropic/claude-3.5-sonnet",
    "--max-tokens", String(config.maxTokens || 4096),
  ];

  const env = {
    ...process.env,
    OPENROUTER_API_KEY: authToken,
  };

  const child = spawn("node", cliArgs, {
    cwd: process.cwd(),
    env,
    stdio: ["pipe", "pipe", "pipe"],
  });

  child.stdin.write(prompt);
  child.stdin.end();

  let finalAssistantContent = "";
  let inputTokens = 0;
  let outputTokens = 0;

  // 4. Process stream-json events
  const stdoutPromise = new Promise<void>((resolve, reject) => {
    let buffer = "";
    child.stdout.on("data", (chunk: Buffer) => {
      buffer += chunk.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const event = JSON.parse(line);
          switch (event.type) {
            case "assistant":
              finalAssistantContent += event.content;
              emitAssistant(onLog, event.content);
              break;
            case "tool_use":
              emitToolCall(onLog, {
                name: event.name,
                input: JSON.stringify(event.input),
                toolUseId: event.id,
              });
              break;
            case "tool_result":
              emitToolResult(onLog, {
                toolUseId: event.id,
                content: event.content,
                isError: event.is_error,
              });
              break;
            case "error":
              emitSystem(onLog, `CLI error: ${event.message}`);
              break;
            default:
              break;
          }
        } catch {
          emitSystem(onLog, `CLI stdout: ${line}`);
        }
      }
    });

    child.stdout.on("end", resolve);
    child.stdout.on("error", reject);
  });

  const stderrPromise = new Promise<void>((resolve, reject) => {
    child.stderr.on("data", (chunk: Buffer) => {
      writeRawStderr(onLog, chunk.toString());
    });
    child.stderr.on("end", resolve);
    child.stderr.on("error", reject);
  });

  const exitCode = await new Promise<number>((resolve) => {
    child.on("close", resolve);
  });

  await Promise.all([stdoutPromise, stderrPromise]);

  // 5. Fetch usage
  try {
    const genRes = await fetch(OPENROUTER_GENERATION_ENDPOINT, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (genRes.ok) {
      const genData = await genRes.json() as any;
      const latest = genData.data?.[0];
      if (latest) {
        inputTokens = latest.usage?.prompt_tokens || 0;
        outputTokens = latest.usage?.completion_tokens || 0;
      }
    }
  } catch {
    // ignore
  }

  // 6. Add comment and update state
  if (finalAssistantContent) {
    await api.addIssueComment(issueId, { body: finalAssistantContent });
  } else {
    await api.addIssueComment(issueId, { body: "_(No output from agent)_" });
  }

  if (exitCode === 0) {
    await api.updateIssue(issueId, { status: "done" });
  } else {
    await api.updateIssue(issueId, { status: "blocked" });
    await api.addIssueComment(issueId, { body: `CLI exited with code ${exitCode}` });
  }

  emitResult(onLog, {
    finalAnswer: finalAssistantContent.slice(0, 500),
    inputTokens,
    outputTokens,
  });

  return {
    text: finalAssistantContent,
    inputTokens,
    outputTokens,
  };
}
