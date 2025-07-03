import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/registry/new-york/components/ui/text';

export default function BlueScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <View className='items-center gap-1'>
        <Text variant='h1' className='text-blue-500'>
          Blue tab
        </Text>
        <Text variant='muted'>Swipe to see other tabs</Text>
      </View>
      <Link href='/material-top-tabs/red'>
        <Text>
          Go to <Text className='text-red-500 font-bold'>red</Text> tab
        </Text>
      </Link>
    </View>
  );
}
