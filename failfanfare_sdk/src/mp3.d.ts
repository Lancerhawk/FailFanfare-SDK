/**
 * Type declaration for MP3 imports.
 * tsup's `loader: { ".mp3": "base64" }` resolves these as base64 data URI strings.
 */
declare module "*.mp3" {
    const src: string;
    export default src;
}
