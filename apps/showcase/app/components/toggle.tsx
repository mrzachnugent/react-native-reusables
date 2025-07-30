import { TogglePreview } from '@/registry/examples/toggle';
import { View } from 'react-native';

export default function ToggleScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <TogglePreview />
    </View>
  );
}
