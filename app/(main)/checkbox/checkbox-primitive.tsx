import { Check } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Checkbox from '~/lib/rn-primitives/checkbox';

export default function CheckboxPrimitiveScreen() {
  const ref = React.useRef<React.ElementRef<typeof Checkbox.Root>>(null);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-6 items-center'>
        <Pressable
          onPress={() => {
            ref.current?.click?.();
          }}
          nativeID='checkLabel'
          className='text-xl'
        >
          <Text className='text-xl text-foreground'>
            Accept terms & conditions
          </Text>
        </Pressable>
        <Checkbox.Root
          className='h-7 w-7 justify-center items-center '
          aria-labelledby='checkLabel'
          ref={ref}
          defaultChecked
        >
          <Checkbox.Indicator className='CheckboxIndicator'>
            <Check className='text-foreground' size={18} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </View>
    </View>
  );
}
