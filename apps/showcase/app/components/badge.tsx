import { BadgePreview } from '@/registry/examples/badge';
import { View } from 'react-native';

export default function BadgeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-5">
      <BadgePreview />
    </View>
  );
}
