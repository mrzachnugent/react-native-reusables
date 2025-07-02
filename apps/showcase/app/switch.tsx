import { SwitchPreview } from '@/examples/switch';
import * as React from 'react';
import { View } from 'react-native';

export default function SwitchScreen() {
  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <SwitchPreview />
      </View>
    </>
  );
}
