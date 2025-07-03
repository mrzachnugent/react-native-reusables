import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/registry/new-york/components/ui/text';

export default function PurpleScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <View className='items-center gap-1'>
        <Text variant='h1' className='text-purple-500'>
          Purple tab
        </Text>
        <Text variant='muted'>Swipe to see other tabs</Text>
      </View>
      <Link href='/material-top-tabs'>
        <Text>
          Go to <Text className='text-blue-500 font-bold'>blue</Text> tab
        </Text>
      </Link>
    </View>
  );
}
