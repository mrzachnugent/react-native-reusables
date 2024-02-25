import * as React from 'react';
import { View } from 'react-native';
import * as Label from '@rnr/label';

export default function LabelScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-6 items-center'>
        <Label.Root>
          <Label.Text
            nativeID='to-be-use-by-aria-labelledby-from-form-field'
            className='text-xl text-foreground'
          >
            Primitive Label
          </Label.Text>
        </Label.Root>
      </View>
    </View>
  );
}
