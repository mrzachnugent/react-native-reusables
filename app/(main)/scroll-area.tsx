import { View } from 'react-native';
import { ScrollArea } from '~/components/ui/scroll-area';

export default function ScrollAreaScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <ScrollArea />
    </View>
  );
}
