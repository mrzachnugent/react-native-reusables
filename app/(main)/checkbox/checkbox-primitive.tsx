import { Check } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import * as Checkbox from '~/lib/rn-primitives/checkbox';
import * as Label from '~/lib/rn-primitives/label';

export default function CheckboxPrimitiveScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-6 items-center'>
        <Label.Root
          onPress={() => {
            setChecked((prev) => !prev);
          }}
        >
          <Label.Text nativeID='checkLabel' className='text-xl text-foreground'>
            Accept terms & conditions
          </Label.Text>
        </Label.Root>

        <Checkbox.Root
          className='h-7 w-7 justify-center items-center border border-primary rounded-lg'
          aria-labelledby='checkLabel'
          checked={checked}
          onCheckedChange={setChecked}
        >
          <Checkbox.Indicator className='CheckboxIndicator'>
            <Check className='text-foreground' size={18} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </View>
    </View>
  );
}
