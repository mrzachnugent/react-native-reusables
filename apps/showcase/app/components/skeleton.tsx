import { SkeletonPreview } from '@/registry/examples/skeleton';
import { View } from 'react-native';

export default function SkeletonScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <SkeletonPreview />
    </View>
  );
}
