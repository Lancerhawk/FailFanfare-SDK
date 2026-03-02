import type { SoundEvent } from "../types";

let lastPlayedAt = 0;
let rapidCount = 0;
let rapidWindowStart = 0;

export function shouldPlay(
  event: SoundEvent,
  throttleMs: number
): SoundEvent | null {
  const now = Date.now();

  if (now - rapidWindowStart >= throttleMs) {
    rapidCount = 0;
    rapidWindowStart = now;
  }
  rapidCount++;

  const escalated: SoundEvent = rapidCount >= 5 ? "critical" : event;

  if (now - lastPlayedAt < throttleMs) {
    return null;
  }

  lastPlayedAt = now;
  return escalated;
}

export function resetThrottle(): void {
  lastPlayedAt = 0;
  rapidCount = 0;
  rapidWindowStart = 0;
}
