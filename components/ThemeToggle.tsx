import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '~/lib/useColorScheme';
import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { cn } from '~/lib/utils';
import { MoonStar, Sun } from './Icons';

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
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:disabled:pointer-events-none disabled:opacity-50'
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
