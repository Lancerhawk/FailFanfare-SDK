import type { SoundEvent } from "../types";

// Internal state — module-level so it persists across calls within the same session
let lastPlayedAt = 0;
let rapidCount = 0;
let rapidWindowStart = 0;

/**
 * Determines whether a sound should play for the given event.
 *
 * Design:
 * 1. `rapidCount` increments BEFORE the throttle gate so every error
 *    contributes to escalation counting — even throttled ones.
 * 2. Escalation to "critical" is resolved BEFORE the throttle gate.
 * 3. The throttle gate fires AFTER escalation so it blocks spam regardless
 *    of whether the resolved event is "critical" or the original event.
 * 4. `lastPlayedAt` updates whenever the gate passes — including on critical.
 *
 * @returns The resolved SoundEvent to play, or `null` if throttled.
 */
export function shouldPlay(
    event: SoundEvent,
    throttleMs: number
): SoundEvent | null {
    const now = Date.now();

    // ── Step 1: Always update rapid-error counter ────────────────────────────
    // Reset the rapid window if it has expired
    if (now - rapidWindowStart >= throttleMs) {
        rapidCount = 0;
        rapidWindowStart = now;
    }
    rapidCount++;

    // ── Step 2: Resolve escalation ───────────────────────────────────────────
    const escalated: SoundEvent = rapidCount >= 5 ? "critical" : event;

    // ── Step 3: Throttle gate ────────────────────────────────────────────────
    if (now - lastPlayedAt < throttleMs) {
        return null; // throttled — don't play
    }

    // Gate passed — update timestamp (always, including on critical)
    lastPlayedAt = now;
    return escalated;
}

/**
 * Resets all throttle state.
 * Useful for testing or if a clean slate is needed.
 * @internal
 */
export function resetThrottle(): void {
    lastPlayedAt = 0;
    rapidCount = 0;
    rapidWindowStart = 0;
}
