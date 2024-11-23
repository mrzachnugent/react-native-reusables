import { PixelRatio } from 'react-native';

const useFontScale = () => {
  const fontScale = PixelRatio.getFontScale();

  const getScaledSize = (size: number) => Math.round(size * fontScale);

  const getScaledHeight = (height: number, fontSize: number) => {
    const scaledFontSize = getScaledSize(fontSize);
    const additionalHeight = Math.max(0, scaledFontSize - fontSize);
    return height + additionalHeight;
  };

  return {
    fontScale,
    getScaledSize,
    getScaledHeight,
  };
}

export { useFontScale };