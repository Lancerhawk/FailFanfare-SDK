import type { FailFanfareOptions } from "./types";
import { isBrowser, isDev } from "./utils/guards";
import { resolveConfig } from "./config";
import { startRuntime } from "./runtime";

let initialized = false;

export function initFailFanfare(options?: FailFanfareOptions): void {
  if (!isBrowser() || !isDev()) return;

  if (options?.enabled === false) return;

  if (initialized) return;

  initialized = true;
  startRuntime(resolveConfig(options));
}

export type { FailFanfareOptions, SoundEvent } from "./types";
