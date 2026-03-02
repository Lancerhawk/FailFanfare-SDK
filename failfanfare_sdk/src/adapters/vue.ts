import { onMounted } from "vue";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

/**
 * Vue 3 composable that initializes FailFanfare when the component mounts.
 *
 * Call this in your root component's `setup()` function or `<script setup>`.
 * The composable is idempotent — calling it multiple times across components
 * is safe thanks to FailFanfare's internal `initialized` flag.
 *
 * @param options - Optional FailFanfare configuration.
 *
 * @example
 * // src/App.vue
 * <script setup lang="ts">
 * import { useFailFanfare } from "failfanfare/vue";
 *
 * useFailFanfare({ volume: 0.6 });
 * </script>
 *
 * @example
 * // With full options
 * useFailFanfare({
 *   watchConsole: true,
 *   enableSuccessSound: true,
 *   sounds: { runtime: "/sounds/oops.mp3" },
 * });
 */
export function useFailFanfare(options?: FailFanfareOptions): void {
    onMounted(() => {
        initFailFanfare(options);
    });
}
