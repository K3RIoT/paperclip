import type { UIAdapterModule } from "../types";
import { type as openrouterType, label as openrouterLabel } from "@paperclipai/adapter-openrouter";
import { SchemaConfigFields, buildSchemaAdapterConfig } from "../schema-config-fields";
import { processUIAdapter } from "../process";

export const openrouterUIAdapter: UIAdapterModule = {
  type: openrouterType,
  label: openrouterLabel,
  parseStdoutLine: processUIAdapter.parseStdoutLine,
  buildAdapterConfig: buildSchemaAdapterConfig,
  ConfigFields: SchemaConfigFields,
};
