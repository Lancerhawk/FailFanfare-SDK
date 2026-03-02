import { onMounted } from "vue";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

export function useFailFanfare(options?: FailFanfareOptions): void {
  onMounted(() => {
    initFailFanfare(options);
  });
}
