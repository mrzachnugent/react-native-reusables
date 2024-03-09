import * as React from 'react';
import { View } from 'react-native';
import { Bold, Italic, Underline } from '~/components/Icons';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '~/components/ui/toggle-group';

export default function ToggleGroupScreen() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <ToggleGroup value={value} onValueChange={setValue} type='multiple'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          <ToggleGroupIcon icon={Bold} size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          <ToggleGroupIcon icon={Italic} size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem value='underline' aria-label='Toggle underline'>
          <ToggleGroupIcon icon={Underline} size={18} />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
