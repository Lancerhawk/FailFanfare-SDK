import type { FailFanfareOptions, ResolvedConfig, SoundEvent } from "./types";

// ── Default sound imports ─────────────────────────────────────────────────
// tsup's `loader: { ".mp3": "base64" }` resolves these as base64 data URIs
// at build time — no external file paths required at runtime.
import aabeSaale from "./sounds/aabe_saale.mp3";
import bruh from "./sounds/bruh.mp3";
import eh from "./sounds/eh.mp3";
import ohMyGodWow from "./sounds/oh_my_god_wow.mp3";
import spiderMan32 from "./sounds/spider_man_32.mp3";

// ── Defaults ──────────────────────────────────────────────────────────────
const DEFAULT_VOLUME = 0.7;
const DEFAULT_THROTTLE_MS = 2000;

const DEFAULT_SOUNDS: Record<SoundEvent, string> = {
    runtime: aabeSaale,      // "Aabe Saale" — plays on window error
    promise: bruh,            // "Bruh" — plays on unhandled promise rejection
    console: eh,              // "Eh" — plays on console.error (opt-in)
    critical: spiderMan32,    // "Spider-Man 32" — plays after 5+ rapid errors
    success: ohMyGodWow,      // "Oh My God Wow" — plays on page load (opt-in)
};

/**
 * Merges user-provided options with defaults, producing a fully resolved config.
 *
 * - User `sounds` overrides are merged on top of defaults — only specified
 *   keys are replaced; the rest keep their defaults.
 * - All numeric/boolean options fall back to defaults if not provided.
 */
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
