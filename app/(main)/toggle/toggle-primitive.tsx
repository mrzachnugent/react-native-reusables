import * as React from 'react';
import { Text, View } from 'react-native';
import * as Toggle from '~/components/primitives/toggle';
import { cn } from '~/lib/utils';

export default function TogglePrimitiveScreen() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Toggle.Root
        pressed={pressed}
        onPressedChange={setPressed}
        className={cn(pressed && 'bg-secondary', 'p-5')}
      >
        <Text className='text-xl text-foreground'>Toggle</Text>
      </Toggle.Root>
    </View>
  );
}
