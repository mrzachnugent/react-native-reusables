import { LabelPreview } from '@/registry/examples/label';
import * as React from 'react';
import { View } from 'react-native';

export default function LabelScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <LabelPreview />
    </View>
  );
}
