import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex-1 justify-center gap-3 items-center'>
        <Text className='text-foreground text-3xl'>
          This screen doesn't exist.
        </Text>
        <View className='h-2' />
        <Link href='/'>
          <Text className='text-foreground'>Go Home</Text>
        </Link>
      </View>
    </>
  );
}
