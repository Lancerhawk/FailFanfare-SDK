import { Injectable } from "@angular/core";
import { initFailFanfare } from "../index";
import type { FailFanfareOptions } from "../types";

/**
 * Angular service that wraps FailFanfare initialization.
 *
 * Provided at root level so there is only one instance per app.
 * Call `init()` from your root `AppComponent` constructor or `ngOnInit`.
 *
 * @example
 * // app.component.ts
 * import { Component, OnInit } from "@angular/core";
 * import { FailFanfareService } from "failfanfare/angular";
 *
 * @Component({ selector: "app-root", templateUrl: "./app.component.html" })
 * export class AppComponent implements OnInit {
 *   constructor(private fanfare: FailFanfareService) {}
 *
 *   ngOnInit(): void {
 *     this.fanfare.init({ volume: 0.6 });
 *   }
 * }
 *
 * @example
 * // With full options
 * this.fanfare.init({
 *   watchConsole: true,
 *   enableSuccessSound: true,
 *   sounds: { runtime: "/assets/sounds/oops.mp3" },
 * });
 */
@Injectable({ providedIn: "root" })
export class FailFanfareService {
    /**
     * Initialize FailFanfare. Safe to call multiple times — only runs once.
     */
    init(options?: FailFanfareOptions): void {
        initFailFanfare(options);
    }
}
