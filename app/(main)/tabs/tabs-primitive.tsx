import React from 'react';
import { Text, View } from 'react-native';
import * as Tabs from '~/lib/rn-primitives/tabs';
import { cn } from '~/lib/utils';

export default function TabsPrimitiveScreen() {
  const [value, setValue] = React.useState('Blue');
  return (
    <View className='flex-1 justify-center  p-6 gap-12'>
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List className='flex-row gap-8'>
          <Tabs.Trigger
            value='Blue'
            className={cn('p-4', value === 'Blue' && 'bg-secondary')}
          >
            <Text className='text-foreground'>Blue</Text>
          </Tabs.Trigger>
          <Tabs.Trigger
            value='Red'
            className={cn('p-4', value === 'Red' && 'bg-secondary')}
          >
            <Text className='text-foreground'>Red</Text>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='Blue' className='border border-border mt-4 p-4'>
          <Text className='text-3xl text-blue-500'>Blue</Text>
        </Tabs.Content>
        <Tabs.Content value='Red' className='border border-border mt-4 p-4'>
          <Text className='text-3xl text-red-500'>Red</Text>
        </Tabs.Content>
      </Tabs.Root>
    </View>
  );
}
