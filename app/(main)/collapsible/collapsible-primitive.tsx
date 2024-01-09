import React from 'react';
import { Text, View } from 'react-native';
import * as Collapsible from '~/lib/rn-primitives/native/collapsible';

export default function CollapsiblePrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger>
          <Text className='text-foreground text-xl'>Trigger</Text>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Text className='text-foreground text-xl'>CONTENT</Text>
        </Collapsible.Content>
      </Collapsible.Root>
    </View>
  );
}
