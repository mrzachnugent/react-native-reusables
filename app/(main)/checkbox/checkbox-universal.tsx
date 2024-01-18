import React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/universal-ui/checkbox';
import { Label, LabelText } from '~/components/universal-ui/label';

export default function CheckboxUniversalScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-3 items-center'>
        <Checkbox
          aria-labelledby='terms'
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label onPress={() => setChecked((prev) => !prev)}>
          <LabelText nativeID='terms'>Accept terms and conditions</LabelText>
        </Label>
      </View>
    </View>
  );
}
