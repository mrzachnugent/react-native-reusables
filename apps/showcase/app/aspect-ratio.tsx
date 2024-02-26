import { View } from 'react-native';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { H1 } from '~/components/ui/typography';

export default function AspectRatioScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='w-1/2'>
        <AspectRatio ratio={16 / 9}>
          <View className='bg-blue-500 h-full w-full rounded-lg justify-center items-center'>
            <H1 className='text-white'>16:9</H1>
          </View>
        </AspectRatio>
      </View>
    </View>
  );
}
