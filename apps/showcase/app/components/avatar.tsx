import { View } from 'react-native';
import { AvatarPreview } from '@/registry/examples/avatar';

export default function AvatarScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <AvatarPreview />
    </View>
  );
}
