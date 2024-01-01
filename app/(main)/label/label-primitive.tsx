import React from 'react';
import { View } from 'react-native';
import * as Label from '~/lib/rn-primitives/label';

export default function LabelPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-6 items-center'>
        <Label.Root nativeID='to-be-use-to-labelby-form-field'>
          <Label.Text className='text-xl text-foreground'>
            Primitive Label
          </Label.Text>
        </Label.Root>
      </View>
    </View>
  );
}
