import { RadioGroupPreview } from '@/registry/examples/radio-group';
import * as React from 'react';
import { View } from 'react-native';

export default function RadioGroupScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <RadioGroupPreview />
    </View>
  );
}
