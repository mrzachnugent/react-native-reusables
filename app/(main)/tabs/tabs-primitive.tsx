import React from 'react';
import { Text, View } from 'react-native';
import * as Tabs from '~/lib/rn-primitives/tabs';

export default function TabsPrimitiveScreen() {
  return (
    <View className='flex-1 justify-center  p-6 gap-12'>
      <Tabs.Root defaultValue='Blue'>
        <Tabs.List className='flex-row gap-8'>
          <Tabs.Trigger value='Blue' className='p-4 bg-secondary'>
            <Text className='text-foreground'>Blue</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value='Red' className='p-4 bg-secondary'>
            <Text className='text-foreground'>Red</Text>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='Blue' className='border border-border mt-4 p-4'>
          <Text className='text-foreground text-3xl text-blue-500'>Blue</Text>
        </Tabs.Content>
        <Tabs.Content value='Red' className='border border-border mt-4 p-4'>
          <Text className='text-foreground text-3xl text-red-500'>Red</Text>
        </Tabs.Content>
      </Tabs.Root>
    </View>
  );
}
