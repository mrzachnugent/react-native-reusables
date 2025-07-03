import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/new-york/components/ui/text';

export default function RedScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <View className='items-center gap-1'>
        <Text variant='h1' className='text-red-500'>
          Red tab
        </Text>
        <Text variant='muted'>Swipe to see other tabs</Text>
      </View>
      <Link href='/material-top-tabs/green'>
        <Text>
          Go to <Text className='text-green-500 font-bold'>green</Text> tab
        </Text>
      </Link>
    </View>
  );
}
