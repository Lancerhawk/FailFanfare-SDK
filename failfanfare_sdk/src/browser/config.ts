import type { FailFanfareOptions, ResolvedConfig, SoundEvent } from "./types";

const CDN_BASE =
  "https://raw.githubusercontent.com/Lancerhawk/FailFanfare-SDK/main/failfanfare_sdk/src/sounds";

const DEFAULT_VOLUME = 0.7;
const DEFAULT_THROTTLE_MS = 2000;

const DEFAULT_SOUNDS: Record<SoundEvent, string> = {
  runtime: `${CDN_BASE}/aabe_saale.mp3`,
  promise: `${CDN_BASE}/bruh.mp3`,
  console: `${CDN_BASE}/eh.mp3`,
  critical: `${CDN_BASE}/spider_man_32.mp3`,
  success: `${CDN_BASE}/oh_my_god_wow.mp3`,
  error: `${CDN_BASE}/aabe_saale.mp3`,
};

export function resolveConfig(options?: FailFanfareOptions): ResolvedConfig {
  const userSounds = options?.sounds ?? {};

  // Create fallbacks for browser keys using the CLI 'error' key if provided
  const mergedSounds = {
    ...DEFAULT_SOUNDS,
    ...userSounds,
  };

  if (!userSounds.runtime && userSounds.error)
    mergedSounds.runtime = userSounds.error;
  if (!userSounds.promise && userSounds.error)
    mergedSounds.promise = userSounds.error;
  if (!userSounds.console && userSounds.error)
    mergedSounds.console = userSounds.error;

  return {
    volume: options?.volume ?? DEFAULT_VOLUME,
    throttleMs: options?.throttleMs ?? DEFAULT_THROTTLE_MS,
    watchConsole: options?.watchConsole ?? false,
    enableSuccessSound: options?.enableSuccessSound ?? false,
    sounds: mergedSounds,
  };
}
