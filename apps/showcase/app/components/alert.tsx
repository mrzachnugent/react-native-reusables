import { AlertPreview } from '@/registry/examples/alert';
import { View } from 'react-native';

export default function AlertScreen() {
  return (
    <View className="items-center p-6">
      <AlertPreview />
    </View>
  );
}
