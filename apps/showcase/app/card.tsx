import { View } from 'react-native';
import { CardPreview } from '@/new-york/examples/card';

export default function CardScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <CardPreview />
    </View>
  );
}
