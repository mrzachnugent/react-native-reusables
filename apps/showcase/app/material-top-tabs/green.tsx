import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/new-york/components/ui/text';

export default function GreenScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <View className='items-center gap-1'>
        <Text variant='h1' className='text-green-500'>
          Green tab
        </Text>
        <Text variant='muted'>Swipe to see other tabs</Text>
      </View>
      <Link href='/material-top-tabs/purple'>
        <Text>
          Go to <Text className='text-purple-500 font-bold'>purple</Text> tab
        </Text>
      </Link>
    </View>
  );
}
