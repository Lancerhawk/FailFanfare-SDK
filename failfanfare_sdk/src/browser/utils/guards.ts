export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isDev(): boolean {
  const _process = (globalThis as any).process;
  if (typeof _process !== "undefined" && _process.env) {
    return _process.env.NODE_ENV !== "production";
  }
  return true;
}
