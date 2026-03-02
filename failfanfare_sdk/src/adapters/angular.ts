import { Injectable } from "@angular/core";
import { initFailFanfare } from "../browser/index";
import type { FailFanfareOptions } from "../browser/types";

@Injectable({ providedIn: "root" })
export class FailFanfareService {
  init(options?: FailFanfareOptions): void {
    initFailFanfare(options);
  }
}
