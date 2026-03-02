import type { FailFanfareOptions } from "./types";
import { isBrowser, isDev } from "./utils/guards";
import { resolveConfig } from "./config";
import { startRuntime } from "./runtime";

// ── Double-init guard ─────────────────────────────────────────────────────
// Module-level flag — persists for the lifetime of the page session.
// Safe to call initFailFanfare() multiple times (e.g. in React StrictMode).
let initialized = false;

/**
 * Initialize FailFanfare — plays humorous sounds when runtime errors occur.
 *
 * **Guards (all must pass before anything runs):**
 * 1. Must be running in a browser (`typeof window !== "undefined"`)
 * 2. Must be in development (`NODE_ENV !== "production"`)
 * 3. `enabled` option must not be explicitly `false`
 * 4. Must not already be initialized (prevents duplicate listeners)
 *
 * @param options - Optional configuration. All fields have sensible defaults.
 *
 * @example
 * // React / Vue / Angular — call anywhere that runs client-side
 * initFailFanfare();
 *
 * @example
 * // Next.js — must be inside useEffect to avoid SSR execution
 * useEffect(() => {
 *   initFailFanfare();
 * }, []);
 *
 * @example
 * // Plain HTML — after loading the IIFE global build
 * // <script src="dist/index.global.js"></script>
 * // <script>FailFanfare.initFailFanfare();</script>
 *
 * @example
 * // With options
 * initFailFanfare({
 *   volume: 0.5,
 *   throttleMs: 3000,
 *   watchConsole: true,
 *   enableSuccessSound: true,
 *   sounds: { runtime: "/my-sounds/oops.mp3" },
 * });
 */
export function initFailFanfare(options?: FailFanfareOptions): void {
    // Guard 1 & 2: SSR-safety and production check
    if (!isBrowser() || !isDev()) return;

    // Guard 3: explicit opt-out
    if (options?.enabled === false) return;

    // Guard 4: double-init prevention
    if (initialized) return;

    initialized = true;
    startRuntime(resolveConfig(options));
}

// Re-export public types so consumers get everything from one import
export type { FailFanfareOptions, SoundEvent } from "./types";
