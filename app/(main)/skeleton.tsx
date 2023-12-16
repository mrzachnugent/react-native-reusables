import { View } from 'react-native';
import { Skeleton } from '~/components/ui/skeleton';

export default function SkeletonScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Skeleton />
    </View>
  );
}
