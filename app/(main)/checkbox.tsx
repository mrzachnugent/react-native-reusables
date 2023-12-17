import React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';

export default function CheckboxScreen() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center gap-8'>
      <Checkbox />
      <Checkbox value={isChecked} onChange={setIsChecked} />
    </View>
  );
}
