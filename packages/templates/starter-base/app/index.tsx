import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className='flex-1 justify-center items-center gap-8 p-4 mb-safe'>
        <Image source={LOGO[colorScheme ?? 'light']} height={85} width={96} />
        <View className='gap-2 p-4'>
          <Text className=' font-mono text-sm'>
            1. Edit <Text variant='code'>app/index.tsx</Text> to get started.
          </Text>
          <Text className=' font-mono text-sm'>
            2.{' '}
            {Platform.select({
              web: 'Save and reload to see your changes.',
              default: 'Save to see your changes instantly.',
            })}
          </Text>
        </View>
        <View className='flex-row gap-2'>
          <Link href='https://reactnativereusables.com' asChild>
            <Button>
              <Text>Browse the Docs</Text>
            </Button>
          </Link>
          <Link href='https://github.com/mrzachnugent/react-native-reusables' asChild>
            <Button variant='ghost'>
              <Text>Star the Repo</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPress={toggleColorScheme}
      size='icon'
      variant='ghost'
      className='rounded-full web:mr-4'
    >
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className='size-5' />
    </Button>
  );
}
