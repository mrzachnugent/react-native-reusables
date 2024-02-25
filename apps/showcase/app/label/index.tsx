import * as React from 'react';
import { View } from 'react-native';
import { Label, LabelText } from '~/components/ui/label';

export default function LabelScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <Label>
        <LabelText nativeID='label'>This is a label</LabelText>
      </Label>
    </View>
  );
}
