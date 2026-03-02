/**
 * The sound event types that FailFanfare responds to.
 *
 * - `"runtime"` — triggered by `window.addEventListener("error", ...)`
 * - `"promise"` — triggered by `unhandledrejection`
 * - `"console"` — triggered by a patched `console.error` (opt-in)
 * - `"critical"` — triggered after 5+ rapid errors within the throttle window
 * - `"success"` — triggered once on `window.load` (opt-in)
 */
export type SoundEvent =
    | "runtime"
    | "promise"
    | "console"
    | "critical"
    | "success";

/**
 * Configuration options for `initFailFanfare()`.
 */
export interface FailFanfareOptions {
    /**
     * Explicitly disable the SDK even in dev mode.
     * Defaults to `true`.
     */
    enabled?: boolean;

    /**
     * Audio volume between 0 and 1.
     * Defaults to `0.7`.
     */
    volume?: number;

    /**
     * Minimum milliseconds between playbacks (throttle window).
     * Defaults to `2000`.
     */
    throttleMs?: number;

    /**
     * If `true`, patches `console.error` to also trigger the "console" sound.
     * Defaults to `false`.
     */
    watchConsole?: boolean;

    /**
     * If `true`, plays the "success" sound once when the page fully loads.
     * Defaults to `false`.
     */
    enableSuccessSound?: boolean;

    /**
     * Override default sounds with custom file paths or data URIs.
     * Only the keys you provide are overridden; the rest use defaults.
     *
     * @example
     * sounds: { runtime: "/my-sounds/oops.mp3" }
     */
    sounds?: Partial<Record<SoundEvent, string>>;
}

/**
 * Fully resolved, normalized config passed into the runtime.
 * @internal
 */
export interface ResolvedConfig {
    volume: number;
    throttleMs: number;
    watchConsole: boolean;
    enableSuccessSound: boolean;
    sounds: Record<SoundEvent, string>;
}
