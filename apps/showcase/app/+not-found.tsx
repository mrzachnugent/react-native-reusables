import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex-1 justify-center gap-3 items-center'>
        <Text className='text-3xl'>This screen doesn't exist.</Text>
        <View className='h-2' />
        <Link href='/'>
          <Text>Go Home</Text>
        </Link>
      </View>
    </>
  );
}
