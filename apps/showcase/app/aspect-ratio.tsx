import { View } from 'react-native';
import { AspectRatioPreview } from '@showcase/components/styles/examples';

export default function AspectRatioScreen() {
  return (
    <View className='flex-1 justify-center items-center px-6'>
      <AspectRatioPreview />
    </View>
  );
}
