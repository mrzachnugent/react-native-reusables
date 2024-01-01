import { Text, View } from 'react-native';
import * as Collapsible from '~/lib/rn-primitives/collapsible';

export default function CollapsiblePrimitiveScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Collapsible.Root
        onOpenChange={(newValue) => {
          console.log('onOpenChange', newValue);
        }}
      >
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
