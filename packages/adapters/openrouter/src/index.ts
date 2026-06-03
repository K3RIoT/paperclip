// ─────────────────────────────────────────────────────────────────
// @paperclipai/adapter-openrouter — Root Metadata (src/index.ts)
// Shared across server · ui · cli — keep dependency-free
// ─────────────────────────────────────────────────────────────────

export const type = "openrouter" as const;
export const label = "OpenRouter";

// ── Static fallback models (shown when API is unreachable) ──────
export const models = [
  // ── Routers ──────────────────────────────────────────────────
  { id: "openrouter/auto",                                    label: "Auto (best free route)" },
  { id: "openrouter/free",                                    label: "Free Router (random free model)" },
  { id: "openrouter/owl-alpha",                               label: "Owl Alpha (agentic)" },

  // ── Free tier ────────────────────────────────────────────────
  { id: "google/gemma-4-31b-it:free",                         label: "Gemma 4 31B (free)" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free",             label: "Nemotron 3 Super 120B (free)" },
  { id: "openai/gpt-oss-120b:free",                           label: "GPT-OSS 120B (free)" },
  { id: "openai/gpt-oss-20b:free",                            label: "GPT-OSS 20B (free)" },
  { id: "qwen/qwen3-coder:free",                              label: "Qwen3 Coder (free)" },
  { id: "meta-llama/llama-3.3-70b-instruct:free",             label: "Llama 3.3 70B (free)" },
  { id: "meta-llama/llama-4-maverick:free",                   label: "Llama 4 Maverick (free)" },
  { id: "meta-llama/llama-4-scout:free",                      label: "Llama 4 Scout (free)" },
  { id: "google/gemma-3-27b-it:free",                         label: "Gemma 3 27B (free)" },
  { id: "deepseek/deepseek-chat-v3-0324:free",                label: "DeepSeek V3 0324 (free)" },
  { id: "qwen/qwen3-235b-a22b:free",                          label: "Qwen3 235B (free)" },
  { id: "moonshotai/kimi-k2.6:free",                          label: "Kimi K2.6 (free)" },
  { id: "nvidia/nemotron-3-nano-30b-a3b:free",                label: "Nemotron Nano 30B (free)" },
  { id: "z-ai/glm-4.5-air:free",                              label: "GLM 4.5 Air (free)" },
  { id: "mistralai/mistral-small-3.2-24b-instruct:free",      label: "Mistral Small 3.2 (free)" },

  // ── Anthropic ────────────────────────────────────────────────
  { id: "anthropic/claude-opus-4-8",                          label: "Claude Opus 4.8" },
  { id: "anthropic/claude-opus-4-7",                          label: "Claude Opus 4.7" },
  { id: "anthropic/claude-opus-4-6",                          label: "Claude Opus 4.6" },
  { id: "anthropic/claude-sonnet-4-6",                        label: "Claude Sonnet 4.6" },
  { id: "anthropic/claude-haiku-4-5",                         label: "Claude Haiku 4.5" },

  // ── OpenAI ───────────────────────────────────────────────────
  { id: "openai/gpt-4.1",                                     label: "GPT-4.1" },
  { id: "openai/gpt-4.1-mini",                                label: "GPT-4.1 Mini" },
  { id: "openai/gpt-4.1-nano",                                label: "GPT-4.1 Nano" },
  { id: "openai/gpt-4o",                                      label: "GPT-4o" },
  { id: "openai/o3",                                          label: "o3" },
  { id: "openai/o4-mini",                                     label: "o4-mini" },

  // ── Google ───────────────────────────────────────────────────
  { id: "google/gemini-2.5-pro-preview",                      label: "Gemini 2.5 Pro" },
  { id: "google/gemini-2.5-flash-preview",                    label: "Gemini 2.5 Flash" },

  // ── DeepSeek ─────────────────────────────────────────────────
  { id: "deepseek/deepseek-r1",                               label: "DeepSeek R1" },
  { id: "deepseek/deepseek-chat-v3-0324",                     label: "DeepSeek V3 0324" },

  // ── Meta ─────────────────────────────────────────────────────
  { id: "meta-llama/llama-4-maverick",                        label: "Llama 4 Maverick" },
  { id: "meta-llama/llama-4-scout",                           label: "Llama 4 Scout" },

  // ── xAI ──────────────────────────────────────────────────────
  { id: "x-ai/grok-3",                                        label: "Grok 3" },
  { id: "x-ai/grok-3-mini",                                   label: "Grok 3 Mini" },
  { id: "x-ai/grok-build-0.1",                                label: "Grok Build 0.1 (coding)" },

  // ── Qwen ─────────────────────────────────────────────────────
  { id: "qwen/qwen3-235b-a22b",                               label: "Qwen3 235B" },
  { id: "qwen/qwen3-coder",                                   label: "Qwen3 Coder" },
  { id: "qwen/qwen3-7-max",                                   label: "Qwen3.7 Max" },

  // ── Mistral ──────────────────────────────────────────────────
  { id: "mistralai/mistral-large-2411",                       label: "Mistral Large" },
  { id: "mistralai/mistral-medium-3",                         label: "Mistral Medium 3" },

  // ── Moonshot ─────────────────────────────────────────────────
  { id: "moonshotai/kimi-k2.6",                               label: "Kimi K2.6" },

  // ── NVIDIA ───────────────────────────────────────────────────
  { id: "nvidia/nemotron-3-super-120b-a12b",                  label: "Nemotron 3 Super 120B" },

  // ── Cohere ───────────────────────────────────────────────────
  { id: "cohere/command-r-plus-08-2024",                      label: "Command R+" },
  { id: "cohere/command-a",                                   label: "Command A" },
];
// ── OpenRouter API constants ────────────────────────────────────
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
export const OPENROUTER_MODELS_ENDPOINT = `${OPENROUTER_BASE_URL}/models`;
export const OPENROUTER_CHAT_ENDPOINT = `${OPENROUTER_BASE_URL}/chat/completions`;
export const OPENROUTER_GENERATION_ENDPOINT = `${OPENROUTER_BASE_URL}/generation`;

// ── Adapter documentation ───────────────────────────────────────
export const agentConfigurationDoc = `# openrouter adapter configuration

## Use when
- You want access to 300+ models (free AND paid) from a single API key
- You want to use OpenRouter's auto-routing for cost-optimized inference
- You need models not available via native adapters (Llama, Qwen, Mistral, DeepSeek, etc.)
- You want to compare outputs across multiple providers without separate API keys

## Core fields
- \`model\` (string) — OpenRouter model ID, e.g. "anthropic/claude-sonnet-4-6"
  Use "openrouter/auto" to let OpenRouter pick the best model automatically.
  Append ":free" to any model ID for free-tier routing.
- \`apiKey\` (string) — Your OpenRouter API key (sk-or-v1-...)
  Can also be set via OPENROUTER_API_KEY env var.
- \`systemPrompt\` (string, optional) — System prompt prepended to all messages.
- \`temperature\` (number, optional) — Sampling temperature (0-2). Default: 0.7
- \`maxTokens\` (number, optional) — Max completion tokens. Default: 4096
- \`topP\` (number, optional) — Nucleus sampling. Default: 1
- \`stream\` (boolean, optional) — Enable SSE streaming. Default: true
- \`reasoning\` (boolean, optional) — Enable extended thinking for supported models.
- \`transforms\` (string[], optional) — OpenRouter transforms, e.g. ["middle-out"]
- \`route\` (string, optional) — "fallback" (default) or "no-fallback"
- \`httpReferer\` (string, optional) — Your app URL for OpenRouter leaderboards
- \`xTitle\` (string, optional) — Your app name for OpenRouter leaderboards

## Don't use when
- You already have a direct API key for a single provider and only need that one model
- You need local/offline inference (use ollama or process adapter instead)
`;

// ── Types ───────────────────────────────────────────────────────
export interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
    request?: string;
    image?: string;
  };
  context_length: number;
  top_provider?: {
    max_completion_tokens?: number;
    is_moderated?: boolean;
  };
  per_request_limits?: Record<string, string> | null;
  architecture?: {
    modality: string;
    tokenizer: string;
    instruct_type: string | null;
  };
}

export interface OpenRouterConfig {
  model: string;
  apiKey?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
  reasoning?: boolean;
  transforms?: string[];
  route?: "fallback" | "no-fallback";
  httpReferer?: string;
  xTitle?: string;
  /** Max tool-loop turns per run. Default 25. */
  maxTurns?: number;
  /** Skip approval gates for hire_agent and similar mutating tools. Default false. */
  autoApprove?: boolean;
  /** Override path to skills directory. Defaults to ~/.openrouter-adapter/skills. */
  skillsDir?: string;
  /** Absolute path to a markdown file that will be read at runtime and
   * prepended to the system prompt. Takes precedence over systemPrompt
   * if both are set. */
  instructionsFilePath?: string;
}
