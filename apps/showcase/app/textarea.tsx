import { TextareaPreview } from '@/registry/new-york/examples/textarea';
import { View } from 'react-native';

export default function InputScreen() {
  return (
    <View className='flex-1 items-center p-6'>
      <TextareaPreview />
    </View>
  );
}
