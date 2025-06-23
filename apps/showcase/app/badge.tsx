import { BadgePreview } from '@/examples/badge';
import { View } from 'react-native';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <BadgePreview />
    </View>
  );
}
