import { View } from 'react-native';
import { AspectRatioPreview } from '@/registry/examples/aspect-ratio';

export default function AspectRatioScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <AspectRatioPreview />
    </View>
  );
}
