import { Injectable } from "@angular/core";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

@Injectable({ providedIn: "root" })
export class FailFanfareService {
  init(options?: FailFanfareOptions): void {
    initFailFanfare(options);
  }
}
