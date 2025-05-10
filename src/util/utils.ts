export const isLightColorEmotion = (emotion: string) => {
    if (emotion in ["기쁨", "평온", "놀람"]) {
        return false;
    }
    return true;
}

export const isLightHexColor = (hex: string) => {
  hex = hex.replace('#', '');

  // 3자리 HEX → 6자리로 변환
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 밝기 계산
  const [R, G, B] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5;
}
