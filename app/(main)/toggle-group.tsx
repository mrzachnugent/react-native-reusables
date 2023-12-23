import { Bold, Italic, Underline } from 'lucide-react-native';
import { View } from 'react-native';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

export default function ToggleGroupScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <ToggleGroup>
        <ToggleGroupItem name='italic'>
          <Italic className='text-foreground' />
        </ToggleGroupItem>
        <ToggleGroupItem name='bold'>
          <Bold className='text-foreground' />
        </ToggleGroupItem>
        <ToggleGroupItem name='underline'>
          <Underline className='text-foreground' />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
