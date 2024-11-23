import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';

const useFontScale = () => {
  const { fontScale } = useWindowDimensions();

  const getScaledSize = useCallback(
    (size: number) => Math.round(size * fontScale),
    [fontScale]
  );

  const getScaledHeight = useCallback(
    (height: number, fontSize: number) => {
      const scaledFontSize = getScaledSize(fontSize);
      const additionalHeight = Math.max(0, scaledFontSize - fontSize);
      return height + additionalHeight;
    },
    [getScaledSize]
  );

  return {
    fontScale,
    getScaledSize,
    getScaledHeight,
  };
};

export { useFontScale };