import { Icon } from '@/registry/new-york/components/ui/icon';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';

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
      <View className='justify-center items-start py-2.5 pl-8 pr-1 web:pr-5 '>
        {colorScheme === 'dark' ? (
          <Icon as={MoonStarIcon} className='text-muted-foreground size-5 stroke-[1.5px]' />
        ) : (
          <Icon as={SunIcon} className='text-muted-foreground size-5 stroke-[1.5px]' />
        )}
      </View>
    </Pressable>
  );
}
