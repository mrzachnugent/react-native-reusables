import React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export default function CheckboxScreen() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center gap-8'>
      <View className='flex-row gap-6 items-center'>
        <Label
          onPress={() => {
            setIsChecked((prev) => !prev);
          }}
          nativeID='checkLabel'
          className='pt-2 text-xl'
        >
          Accept terms & conditions
        </Label>
        <Checkbox
          aria-labelledby='checkLabel'
          value={isChecked}
          onChange={setIsChecked}
        />
      </View>
    </View>
  );
}
