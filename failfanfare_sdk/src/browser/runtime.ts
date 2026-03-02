import type { ResolvedConfig, SoundEvent } from "./types";
import { playBrowserSound } from "../shared/audio.browser";
import { shouldPlay } from "./utils/throttle";

let successPlayed = false;

export function startRuntime(config: ResolvedConfig): void {
  const { volume, throttleMs, sounds, watchConsole, enableSuccessSound } =
    config;

  function trigger(event: SoundEvent): void {
    const resolved = shouldPlay(event, throttleMs);
    if (resolved !== null) {
      playBrowserSound(sounds[resolved], volume);
    }
  }

  window.addEventListener("error", () => {
    trigger("runtime");
  });

  window.addEventListener("unhandledrejection", () => {
    trigger("promise");
  });

  if (watchConsole) {
    const _originalConsoleError = console.error.bind(console);
    console.error = (...args: unknown[]): void => {
      _originalConsoleError(...args);
      trigger("console");
    };

    if (enableSuccessSound) {
      const _originalConsoleLog = console.log.bind(console);
      console.log = (...args: unknown[]): void => {
        _originalConsoleLog(...args);
        const str = args.join(" ");
        if (
          !successPlayed &&
          /ready|compiled successfully|local:|started|listening/i.test(str)
        ) {
          successPlayed = true;
          trigger("success");
        }
      };
    }
  }

  if (enableSuccessSound && !successPlayed) {
    if (document.readyState === "complete") {
    } else {
      window.addEventListener(
        "load",
        () => {
          if (!successPlayed) {
            successPlayed = true;
            playBrowserSound(sounds["success"], volume);
          }
        },
        { once: true }
      );
    }
  }
}
