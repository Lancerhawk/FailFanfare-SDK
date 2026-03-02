import { onMounted } from "vue";
import { initFailFanfare } from "../browser/index";
import type { FailFanfareOptions } from "../browser/types";

export function useFailFanfare(options?: FailFanfareOptions): void {
  onMounted(() => {
    initFailFanfare(options);
  });
}
