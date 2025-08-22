import { ToggleGroupPreview } from '@/registry/examples/toggle-group';
import { View } from 'react-native';

export default function ToggleGroupScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <ToggleGroupPreview />
    </View>
  );
}
