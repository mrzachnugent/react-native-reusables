import { View } from 'react-native';
import { CardPreview } from '@showcase/components/styles/examples';

export default function CardScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <CardPreview />
    </View>
  );
}
