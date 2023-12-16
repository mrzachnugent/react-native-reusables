import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { View } from 'react-native';
import { Sun, MoonStar } from 'lucide-react-native';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        Haptics.selectionAsync();
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      <View className='flex-1 aspect-square justify-center items-start'>
        {colorScheme === 'light' ? (
          <Sun className='text-foreground' size={27} strokeWidth={1.25} />
        ) : (
          <MoonStar className='text-foreground' size={27} strokeWidth={1.25} />
        )}
      </View>
    </TouchableOpacity>
  );
}
