import { SkeletonPreview } from '@/new-york/examples/skeleton';
import { View } from 'react-native';

export default function SkeletonScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <SkeletonPreview />
    </View>
  );
}
