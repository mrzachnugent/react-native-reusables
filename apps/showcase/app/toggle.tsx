import * as React from 'react';
import { View } from 'react-native';
import { Bold } from '~/components/Icons';
import { Toggle, ToggleIcon } from '~/components/ui/toggle';

export default function ToggleUniversalcreen() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label='Toggle bold'
        variant='outline'
      >
        <ToggleIcon icon={Bold} size={18} />
      </Toggle>
    </View>
  );
}
