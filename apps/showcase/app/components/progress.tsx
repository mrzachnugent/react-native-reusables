import { ProgressPreview } from '@showcase/components/styles/examples';
import * as React from 'react';
import { View } from 'react-native';

export default function ProgressScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <ProgressPreview />
    </View>
  );
}
