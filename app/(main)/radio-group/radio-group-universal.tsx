import React from 'react';
import { View } from 'react-native';
import { Label, LabelText } from '~/components/universal-ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '~/components/universal-ui/radio-group';

export default function RadioGroupPrimitiveScreen() {
  const [value, setValue] = React.useState('Primitive 2');

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <RadioGroup value={value} onValueChange={setValue} className='gap-3'>
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
      </RadioGroup>
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
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label onPress={onLabelPress}>
        <LabelText nativeID={`label-for-${value}`}>{value}</LabelText>
      </Label>
    </View>
  );
}
