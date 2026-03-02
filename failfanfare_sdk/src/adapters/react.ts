import { useEffect } from "react";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

/**
 * React hook that initializes FailFanfare on component mount.
 *
 * Call this in your root component (e.g. `App.tsx` or Next.js `_app.tsx`).
 * The hook is safe to call in React StrictMode — double-initialization is
 * prevented by FailFanfare's internal `initialized` flag.
 *
 * @param options - Optional FailFanfare configuration.
 *
 * @example
 * // src/App.tsx
 * import { useFailFanfare } from "failfanfare/react";
 *
 * export default function App() {
 *   useFailFanfare({ volume: 0.6 });
 *   return <div>My App</div>;
 * }
 *
 * @example
 * // Next.js pages/_app.tsx
 * import { useFailFanfare } from "failfanfare/react";
 *
 * export default function MyApp({ Component, pageProps }) {
 *   useFailFanfare();
 *   return <Component {...pageProps} />;
 * }
 */
export function useFailFanfare(options?: FailFanfareOptions): void {
    useEffect(() => {
        initFailFanfare(options);
        // Options are intentionally not in the dependency array.
        // FailFanfare initializes once per session — re-running on option
        // changes would have no effect due to the double-init guard.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
