export type SoundEvent =
  | "runtime"
  | "promise"
  | "console"
  | "critical"
  | "success"
  | "error";

export interface FailFanfareOptions {
  enabled?: boolean;
  volume?: number;
  throttleMs?: number;
  watchConsole?: boolean;
  enableSuccessSound?: boolean;
  sounds?: Partial<Record<SoundEvent, string>>;
}

export interface ResolvedConfig {
  volume: number;
  throttleMs: number;
  watchConsole: boolean;
  enableSuccessSound: boolean;
  sounds: Record<SoundEvent, string>;
}
