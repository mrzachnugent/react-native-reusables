import React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Bold, Italic, Underline } from 'lucide-react-native';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

export default function ToggleGroupScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <ToggleGroup>
        <ToggleGroupItem name='italic'>
          <Italic className='text-foreground' />
        </ToggleGroupItem>
        <ToggleGroupItem name='bold'>
          <Bold className='text-foreground' />
        </ToggleGroupItem>
        <ToggleGroupItem name='underline'>
          <Underline className='text-foreground' />
        </ToggleGroupItem>
      </ToggleGroup>

      <View className='py-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </View>
  );
}
