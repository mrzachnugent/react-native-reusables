import React from 'react';
import { View } from 'react-native';
import { Toggle, ToggleIcon } from '~/components/universal-ui/toggle';

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
        <ToggleIcon name='Bold' size={18} />
      </Toggle>
    </View>
  );
}
