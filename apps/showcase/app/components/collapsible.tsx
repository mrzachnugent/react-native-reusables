import { CollapsiblePreview } from '@showcase/components/styles/examples';
import * as React from 'react';
import { View } from 'react-native';

export default function CollapsibleScreen() {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <CollapsiblePreview />
    </View>
  );
}
