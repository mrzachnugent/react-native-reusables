import * as React from 'react';
import { View } from 'react-native';
import { CheckboxPreview } from '@/registry/examples/checkbox';

export default function CheckboxScreen() {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <CheckboxPreview />
    </View>
  );
}
