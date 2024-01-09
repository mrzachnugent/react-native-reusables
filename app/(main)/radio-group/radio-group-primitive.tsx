import React from 'react';
import { View } from 'react-native';
import * as Label from '~/lib/rn-primitives/todo/label';
import * as RadioGroup from '~/lib/rn-primitives/todo/radio-group';

export default function RadioGroupPrimitiveScreen() {
  const [value, setValue] = React.useState('Primitive 2');

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <RadioGroup.Root value={value} onValueChange={setValue} className='gap-5'>
        <RadioGroupItemWithLabel
          value='Primitive 1'
          onLabelPress={onLabelPress('Primitive 1')}
        />
        <RadioGroupItemWithLabel
          value='Primitive 2'
          onLabelPress={onLabelPress('Primitive 2')}
        />
        <RadioGroupItemWithLabel
          value='Primitive 3'
          onLabelPress={onLabelPress('Primitive 3')}
        />
      </RadioGroup.Root>
    </View>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={'flex-row gap-3 items-center'}>
      <RadioGroup.Item
        className={
          'h-6 w-6 border-primary [borderWidth:1.5] items-center justify-center'
        }
        aria-labelledby={`label-for-${value}`}
        value={value}
      >
        <RadioGroup.Indicator className={'h-6 w-6 bg-primary'} />
      </RadioGroup.Item>
      <Label.Root onPress={onLabelPress}>
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
