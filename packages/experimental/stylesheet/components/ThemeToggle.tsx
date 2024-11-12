import { MoonStar, Sun } from 'lucide-react-native';
import { Appearance, Pressable, useColorScheme } from 'react-native';

export function ThemeToggle() {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
      }}
    >
      {colorScheme === 'dark' ? (
        <MoonStar size={23} strokeWidth={1.25} />
      ) : (
        <Sun size={24} strokeWidth={1.25} />
      )}
    </Pressable>
  );
}
