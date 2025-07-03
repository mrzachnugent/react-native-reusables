import { HoverCardPreview } from '@/new-york/examples/hover-card';
import * as React from 'react';
import { View } from 'react-native';

export default function HoverCardScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <HoverCardPreview />
    </View>
  );
}
