import { Pressable, View } from 'react-native';
import { MoonStar, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Icon } from '@/registry/new-york/components/ui/icon';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70'
    >
      <View className='flex-1 aspect-square pt-0.5 justify-center items-start web:px-5'>
        {colorScheme === 'dark' ? (
          <Icon as={MoonStar} className='text-foreground' size={23} strokeWidth={1.25} />
        ) : (
          <Icon as={Sun} className='text-foreground' size={24} strokeWidth={1.25} />
        )}
      </View>
    </Pressable>
  );
}
