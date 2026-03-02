/**
 * Returns true if the code is running in a browser (window is defined).
 * Guards against SSR environments like Next.js server rendering.
 */
export function isBrowser(): boolean {
    return typeof window !== "undefined";
}

/**
 * Returns true if we are in a development environment.
 *
 * Uses an explicit typeof guard — no try/catch — to safely check
 * process.env.NODE_ENV in both browser and Node/SSR contexts.
 *
 * Falls back to `true` (assume dev) when running in a pure browser
 * context where `process` is not defined at all.
 */
export function isDev(): boolean {
    const _process = (globalThis as any).process;
    if (typeof _process !== "undefined" && _process.env) {
        return _process.env.NODE_ENV !== "production";
    }
    // Pure browser context (no bundler-injected process shim) → assume dev
    return true;
}
