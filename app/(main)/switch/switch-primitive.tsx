import React from 'react';
import { View } from 'react-native';
import * as Switch from '~/lib/rn-primitives/switch';
import { cn } from '~/lib/utils';

export default function SwitchPrimitiveScreen() {
  const [on, setOn] = React.useState(false);

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Switch.Root
          checked={on}
          onCheckedChange={setOn}
          className={cn(
            'rounded-full h-12 w-20 justify-center',
            on ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-secondary'
          )}
        >
          <Switch.Thumb
            className={cn(
              'w-10 h-10 absolute rounded-full bg-white',
              on ? 'right-1' : 'left-1 opacity-90'
            )}
          />
        </Switch.Root>
      </View>
    </>
  );
}
