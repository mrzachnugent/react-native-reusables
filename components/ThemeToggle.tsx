import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoonStar, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { cn } from '~/lib/utils';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
      className='ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square pt-0.5 justify-center items-start web:px-5',
            pressed && 'opacity-70'
          )}
        >
          {colorScheme === 'light' ? (
            <Sun className='text-foreground' size={24} strokeWidth={1.25} />
          ) : (
            <MoonStar
              className='text-foreground'
              size={24}
              strokeWidth={1.25}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}
