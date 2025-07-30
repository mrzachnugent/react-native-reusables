import { InputPreview } from '@/registry/examples/input';
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';

export default function InputScreen() {
  return (
    <KeyboardGestureArea interpolator="ios" style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1 justify-center items-center p-6"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled">
        <View className="max-auto w-full max-w-sm">
          <InputPreview />
        </View>
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
}
