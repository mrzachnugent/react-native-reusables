import { HoverCardPreview } from '@/registry/examples/hover-card';
import * as React from 'react';
import { View } from 'react-native';

export default function HoverCardScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12 p-6">
      <HoverCardPreview />
    </View>
  );
}
