import { SeparatorPreview } from '@/examples/separator';
import { View } from 'react-native';

export default function SeparatorScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='w-full max-w-xs '>
        <SeparatorPreview />
      </View>
    </View>
  );
}
