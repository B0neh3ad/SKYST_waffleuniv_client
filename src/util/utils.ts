export const isLightColorEmotion = (emotion: string) => {
    if (emotion in ["기쁨", "평온", "놀람"]) {
        return false;
    }
    return true;
}