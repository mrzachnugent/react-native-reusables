import React from 'react';
import { View } from 'react-native';
import * as Label from '~/lib/rn-primitives/label';
import * as RadioGroup from '~/lib/rn-primitives/radio-group';

export default function RadioGroupPrimitiveScreen() {
  const [value, setValue] = React.useState('Primitive 2');
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <RadioGroup.Root value={value} onValueChange={setValue} className='gap-5'>
        <RadioGroupItemWithLabel value='Primitive 1' />
        <RadioGroupItemWithLabel value='Primitive 2' />
        <RadioGroupItemWithLabel value='Primitive 3' />
      </RadioGroup.Root>
    </View>
  );
}

function RadioGroupItemWithLabel({ value }: { value: string }) {
  const ref = React.useRef<React.ElementRef<typeof RadioGroup.Item>>(null);
  function handleOnPress() {
    ref.current?.click?.();
  }
  return (
    <View className={'flex-row gap-3 items-center'}>
      <RadioGroup.Item
        ref={ref}
        className={
          'h-6 w-6 border-primary [borderWidth:1.5] items-center justify-center'
        }
        aria-labelledby={`label-for-${value}`}
        value={value}
      >
        <RadioGroup.Indicator className={'h-6 w-6 bg-primary'} />
      </RadioGroup.Item>
      <Label.Root onPress={handleOnPress}>
        <Label.Text
          nativeID={`label-for-${value}`}
          className='text-xl text-foreground'
        >
          {value}
        </Label.Text>
      </Label.Root>
    </View>
  );
}
