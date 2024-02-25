import { AlignCenter, AlignLeft, Bold, Italic } from '~/components/Icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import * as Toolbar from '@rnr/toolbar';
import { cn } from '~/lib/utils';

export default function ToolbarScreen() {
  const [singleValue, setSingleValue] = React.useState<string>();
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Toolbar.Root className='flex-row gap-3 justify-center border border-border p-2 rounded-lg'>
        <Toolbar.ToggleGroup
          type='multiple'
          value={multipleValue}
          onValueChange={setMultipleValue}
          className='flex-row gap-1'
        >
          <Toolbar.ToggleItem
            value='bold'
            className={cn(multipleValue.includes('bold') && 'bg-secondary', 'p-3 rounded-lg')}
          >
            <Bold className='text-foreground' />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value='italic'
            className={cn(multipleValue.includes('italic') && 'bg-secondary', 'p-3 rounded-lg')}
          >
            <Italic className='text-foreground' />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className='h-full w-0.5 bg-border' />
        <Toolbar.ToggleGroup
          type='single'
          value={singleValue}
          onValueChange={setSingleValue}
          className='flex-row gap-1'
        >
          <Toolbar.ToggleItem
            value='left'
            className={cn(singleValue === 'left' && 'bg-secondary', 'p-3 rounded-lg')}
          >
            <AlignLeft className='text-foreground' />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value='center'
            className={cn(singleValue === 'center' && 'bg-secondary', 'p-3 rounded-lg')}
          >
            <AlignCenter className='text-foreground' />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className='h-full w-0.5 bg-border' />
        <View className='flex-row flex-1 justify-end items-center'>
          <Toolbar.Button
            onPress={() => {
              console.log('Button pressed');
            }}
            className='bg-secondary py-2 px-4 rounded-lg active:opacity-80'
          >
            <Text className='text-xl text-foreground'>Button</Text>
          </Toolbar.Button>
        </View>
      </Toolbar.Root>
    </View>
  );
}
