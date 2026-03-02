import type { ResolvedConfig, SoundEvent } from "./types";
import { playSound } from "./utils/audio";
import { shouldPlay } from "./utils/throttle";

// ── Internal one-shot guard for the success sound ─────────────────────────
// Persists across any re-calls to startRuntime (double-init is already
// blocked in index.ts, but this provides an extra safety net).
let successPlayed = false;

/**
 * Wires all browser event listeners according to the resolved config.
 *
 * Event sources:
 * - `window.addEventListener("error", ...)` → "runtime"
 *   Uses addEventListener — never overwrites window.onerror directly
 *   so existing user error handlers are fully preserved.
 *
 * - `window.addEventListener("unhandledrejection", ...)` → "promise"
 *
 * - `console.error` patch (opt-in via `watchConsole`) → "console"
 *   Original console.error is called first, then the sound fires.
 *
 * - `window.addEventListener("load", ...)` (opt-in) → "success"
 *   Fires at most once per session. No-op if the load event already fired
 *   (e.g. when initFailFanfare is called late in a React component).
 *
 * All events pass through `shouldPlay()` which handles:
 *   - Throttle gating
 *   - Escalation to "critical" after 5+ rapid errors
 *
 * @internal
 */
export function startRuntime(config: ResolvedConfig): void {
    const { volume, throttleMs, sounds, watchConsole, enableSuccessSound } =
        config;

    // ── Helper: resolve event through throttle/escalation then play ──────────
    function trigger(event: SoundEvent): void {
        const resolved = shouldPlay(event, throttleMs);
        if (resolved !== null) {
            playSound(sounds[resolved], volume);
        }
    }

    // ── 1. Runtime errors ────────────────────────────────────────────────────
    // Uses addEventListener — does NOT overwrite window.onerror
    window.addEventListener("error", (_event: ErrorEvent) => {
        trigger("runtime");
    });

    // ── 2. Unhandled promise rejections ─────────────────────────────────────
    window.addEventListener("unhandledrejection", () => {
        trigger("promise");
    });

    // ── 3. console.error patch (opt-in) ─────────────────────────────────────
    if (watchConsole) {
        const _originalConsoleError = console.error.bind(console);
        console.error = (...args: unknown[]): void => {
            // Always call original first — SDK must not swallow log output
            _originalConsoleError(...args);
            trigger("console");
        };
    }

    // ── 4. Success sound on page load (opt-in, once only) ───────────────────
    if (enableSuccessSound && !successPlayed) {
        if (document.readyState === "complete") {
            // Page already loaded (e.g. SDK initialized late in a React component)
            // — skip the success sound rather than playing unexpectedly late
        } else {
            window.addEventListener(
                "load",
                () => {
                    if (!successPlayed) {
                        successPlayed = true;
                        playSound(sounds["success"], volume);
                    }
                },
                { once: true }
                // Note: window.load does NOT refire on Vite/Next.js HMR — by design.
                // The success sound plays on the initial page load only.
            );
        }
    }
}
