import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { Appearance, Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Appearance.setColorScheme is not supported on web
  Appearance.setColorScheme = (scheme) => {
    if (scheme === 'dark') {
      globalThis.window?.document.documentElement.classList.add('dark');
    } else {
      globalThis.window?.document.documentElement.classList.remove('dark');
    }
  };
}

export const useColorScheme = useNativewindColorScheme;
