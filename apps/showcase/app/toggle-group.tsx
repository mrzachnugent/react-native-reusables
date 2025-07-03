import { ToggleGroupPreview } from '@/registry/new-york/examples/toggle-group';
import { View } from 'react-native';

export default function ToggleGroupScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <ToggleGroupPreview />
    </View>
  );
}
