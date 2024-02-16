import * as React from 'react';
import { View } from 'react-native';
import { Menubar } from '~/components/old-ui/menubar';

export default function MenubarScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Menubar />
    </View>
  );
}
