import { SwitchPreview } from '@/registry/examples/switch';
import * as React from 'react';
import { View } from 'react-native';

export default function SwitchScreen() {
  return (
    <>
      <View className="flex-1 items-center justify-center gap-12 p-6">
        <SwitchPreview />
      </View>
    </>
  );
}
