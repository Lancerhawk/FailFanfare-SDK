import { useEffect } from "react";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

export function useFailFanfare(options?: FailFanfareOptions): void {
  useEffect(() => {
    initFailFanfare(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
