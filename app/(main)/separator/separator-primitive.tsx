import * as React from 'react';
import { View } from 'react-native';
import * as Separator from '~/components/primitives/separator';

export default function SeparatorPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Separator.Root className='h-0.5 w-full bg-border' />
    </View>
  );
}
