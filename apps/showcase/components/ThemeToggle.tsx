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
      hitSlop={24}
      onPress={toggleColorScheme}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70'
    >
      <View className='justify-center items-start py-2.5 pl-8 pr-0.5 web:pr-5 '>
        {colorScheme === 'dark' ? (
          <Icon as={MoonStar} className='text-muted-foreground size-[18px]' />
        ) : (
          <Icon as={Sun} className='text-muted-foreground size-[18px]' />
        )}
      </View>
    </Pressable>
  );
}
