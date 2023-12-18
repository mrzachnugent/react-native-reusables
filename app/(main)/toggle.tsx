import { Bold, Italic } from 'lucide-react-native';
import { View } from 'react-native';
import { Toggle } from '~/components/ui/toggle';

export default function ToggleScreen() {
  return (
    <View className='flex-1 flex-row gap-3 justify-center items-center'>
      <Toggle aria-label='Toggle Italic'>
        <Italic className='text-foreground' />
      </Toggle>
      <Toggle aria-label='Toggle Bold'>
        <Bold className='text-foreground' />
      </Toggle>
    </View>
  );
}
