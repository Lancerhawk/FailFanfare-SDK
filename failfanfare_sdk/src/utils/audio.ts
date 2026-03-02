/**
 * Safely loads and plays an audio file.
 *
 * - Respects browser autoplay restrictions (swallows rejected play() promises).
 * - Clamps volume to [0, 1].
 * - Never throws — audio failure must never crash the host application.
 */
export function playSound(src: string, volume: number): void {
    try {
        const audio = new Audio(src);
        audio.volume = Math.max(0, Math.min(1, volume));
        // play() returns a Promise which browsers reject on autoplay restriction.
        // We catch and ignore it — the SDK should never error the host app.
        audio.play().catch(() => {
            /* intentionally silent */
        });
    } catch {
        /* intentionally silent — never crash the host application */
    }
}
