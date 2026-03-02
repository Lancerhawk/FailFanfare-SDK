import type { FailFanfareOptions, ResolvedConfig, SoundEvent } from "./types";

import aabeSaale from "./sounds/aabe_saale.mp3";
import bruh from "./sounds/bruh.mp3";
import eh from "./sounds/eh.mp3";
import ohMyGodWow from "./sounds/oh_my_god_wow.mp3";
import spiderMan32 from "./sounds/spider_man_32.mp3";

const DEFAULT_VOLUME = 0.7;
const DEFAULT_THROTTLE_MS = 2000;

const DEFAULT_SOUNDS: Record<SoundEvent, string> = {
  runtime: aabeSaale,
  promise: bruh,
  console: eh,
  critical: spiderMan32,
  success: ohMyGodWow,
};

export function resolveConfig(options?: FailFanfareOptions): ResolvedConfig {
  return {
    volume: options?.volume ?? DEFAULT_VOLUME,
    throttleMs: options?.throttleMs ?? DEFAULT_THROTTLE_MS,
    watchConsole: options?.watchConsole ?? false,
    enableSuccessSound: options?.enableSuccessSound ?? false,
    sounds: {
      ...DEFAULT_SOUNDS,
      ...(options?.sounds ?? {}),
    },
  };
}
