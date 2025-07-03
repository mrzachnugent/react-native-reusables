import { TogglePreview } from '@/new-york/examples';
import { View } from 'react-native';

export default function ToggleScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <TogglePreview />
    </View>
  );
}
