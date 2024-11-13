import { MoonStar, Sun } from 'lucide-react-native';
import {
  Appearance,
  Pressable,
  type PressableStateCallbackType,
  useColorScheme,
} from 'react-native';
import { setAndroidNavigationBar } from '~/styles/android-navigation-bar';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';

export function ThemeToggle() {
  const { styles, theme } = useStyleSheet(stylesheet);
  const colorScheme = useColorScheme();

  function toggleColorScheme() {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newColorScheme);
    setAndroidNavigationBar(newColorScheme);
  }

  return (
    <Pressable style={styles.root} onPress={toggleColorScheme}>
      {colorScheme === 'dark' ? (
        <MoonStar size={23} strokeWidth={1.25} color={theme.colors.foreground} />
      ) : (
        <Sun size={24} strokeWidth={1.25} color={theme.colors.foreground} />
      )}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(() => {
  return {
    root: (ev: PressableStateCallbackType) => ({
      opacity: ev.pressed ? 0.7 : 1,
    }),
  };
});
