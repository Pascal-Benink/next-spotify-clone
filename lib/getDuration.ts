export const getAudioDuration = (
    url: string,
    callback: (formattedDuration: string | null, error?: string) => void
): void => {
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        callback(formattedDuration);
    });
    audio.addEventListener('error', (e) => {
        callback(null, `Failed to load audio: ${e.message}`);
    });
};