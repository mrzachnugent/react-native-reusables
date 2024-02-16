import * as React from 'react';
import { Text, View } from 'react-native';
import * as ToggleGroup from '~/components/primitives/toggle-group';
import { cn } from '~/lib/utils';

export default function ToggleGroupPrimitiveScreen() {
  const [singleValue, setSingleValue] = React.useState<string>();
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <ToggleGroup.Root
        type='single'
        value={singleValue}
        onValueChange={setSingleValue}
        className='flex-row gap-4'
      >
        <ToggleGroup.Item
          value='bold'
          className={cn(singleValue === 'bold' && 'bg-secondary', 'p-5')}
        >
          <Text className='text-xl text-foreground font-bold'>Single Bold</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value='italic'
          className={cn(singleValue === 'italic' && 'bg-secondary', 'p-5')}
        >
          <Text className='text-xl text-foreground italic'>Single Italic</Text>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root
        type='multiple'
        value={multipleValue}
        onValueChange={setMultipleValue}
        className='flex-row gap-4'
      >
        <ToggleGroup.Item
          value='bold'
          className={cn(
            multipleValue.includes('bold') && 'bg-secondary',
            'p-5'
          )}
        >
          <Text className='text-xl text-foreground font-bold'>
            Multiple Bold
          </Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value='italic'
          className={cn(
            multipleValue.includes('italic') && 'bg-secondary',
            'p-5'
          )}
        >
          <Text className='text-xl text-foreground italic'>
            Multiple Italic
          </Text>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </View>
  );
}
