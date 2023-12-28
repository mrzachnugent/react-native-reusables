import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Sun, MoonStar } from 'lucide-react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      <View className='flex-1 aspect-square pt-0.5 justify-center items-start web:px-4'>
        {colorScheme === 'light' ? (
          <Sun className='text-foreground' size={24} strokeWidth={1.25} />
        ) : (
          <MoonStar className='text-foreground' size={24} strokeWidth={1.25} />
        )}
      </View>
    </TouchableOpacity>
  );
}
