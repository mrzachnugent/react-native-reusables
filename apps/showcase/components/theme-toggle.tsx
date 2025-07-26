import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import { Image, Pressable } from 'react-native';

const THEME_TOGGLE_IMAGES = {
  light: require('@showcase/assets/images/theme-toggle-light.png'),
  dark: require('@showcase/assets/images/theme-toggle-dark.png'),
};

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="web:pr-5 web:ring-offset-background web:transition-colors web:focus-visible`:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 items-start justify-center py-2.5 pl-2 pr-1 active:opacity-80">
      <Image source={THEME_TOGGLE_IMAGES[colorScheme]} className="size-6" />
    </Pressable>
  );
}
