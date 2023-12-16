import { View } from 'react-native';
import { Slider } from '~/components/ui/slider';

export default function SliderScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Slider />
    </View>
  );
}
