import * as React from 'react';
import { View } from 'react-native';
import { Label } from '~/components/ui/label';

export default function LabelScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Label nativeID='label'>This is a label</Label>
    </View>
  );
}
