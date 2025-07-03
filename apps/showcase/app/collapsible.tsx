import { CollapsiblePreview } from '@/registry/new-york/examples/collapsible';
import * as React from 'react';
import { View } from 'react-native';

export default function CollapsibleScreen() {
  return (
    <View className='flex-1 justify-center items-center p-8'>
      <CollapsiblePreview />
    </View>
  );
}
