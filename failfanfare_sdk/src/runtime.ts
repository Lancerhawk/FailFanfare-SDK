import type { ResolvedConfig, SoundEvent } from "./types";
import { playSound } from "./utils/audio";
import { shouldPlay } from "./utils/throttle";

let successPlayed = false;

export function startRuntime(config: ResolvedConfig): void {
  const { volume, throttleMs, sounds, watchConsole, enableSuccessSound } =
    config;

  function trigger(event: SoundEvent): void {
    const resolved = shouldPlay(event, throttleMs);
    if (resolved !== null) {
      playSound(sounds[resolved], volume);
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
  }

  if (enableSuccessSound && !successPlayed) {
    if (document.readyState === "complete") {
    } else {
      window.addEventListener(
        "load",
        () => {
          if (!successPlayed) {
            successPlayed = true;
            playSound(sounds["success"], volume);
          }
        },
        { once: true }
      );
    }
  }
}
