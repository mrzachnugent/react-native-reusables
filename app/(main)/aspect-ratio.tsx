import { View } from 'react-native';
import { AspectRatio } from '~/components/ui/aspect-ratio';

export default function AspectRatioScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='w-1/2'>
        <AspectRatio ratio={16 / 9}>
          <View className='bg-blue-500 h-full w-full rounded-lg' />
        </AspectRatio>
      </View>
    </View>
  );
}
