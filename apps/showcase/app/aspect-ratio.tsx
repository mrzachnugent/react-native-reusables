import { View } from 'react-native';
import { AspectRatioPreview } from '@/examples/aspect-ratio';

export default function AspectRatioScreen() {
  return (
    <View className='flex-1 justify-center items-center px-6'>
      <AspectRatioPreview />
    </View>
  );
}
