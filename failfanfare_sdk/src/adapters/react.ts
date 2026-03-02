import { useEffect } from "react";
import { initFailFanfare } from "../browser/index";
import type { FailFanfareOptions } from "../browser/types";

export function useFailFanfare(options?: FailFanfareOptions): void {
  useEffect(() => {
    initFailFanfare(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
