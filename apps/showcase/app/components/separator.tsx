import { SeparatorPreview } from '@/registry/examples/separator';
import { View } from 'react-native';

export default function SeparatorScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <View className="w-full max-w-xs">
        <SeparatorPreview />
      </View>
    </View>
  );
}
