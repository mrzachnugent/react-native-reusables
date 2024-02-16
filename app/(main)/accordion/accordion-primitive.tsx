import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import * as Accordion from '~/components/primitives/accordion';

export default function AccordionPrimitiveScreen() {
  const [multiple, setMultiple] = React.useState<string[]>(['item-1']);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Accordion.Root
        type='multiple'
        value={multiple}
        onValueChange={setMultiple}
      >
        <Accordion.Item value='item-1'>
          <Accordion.Header>
            <Accordion.Trigger>
              <Text className='text-foreground text-xl'>Trigger 1</Text>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Text className='text-foreground text-xl'>Content 1</Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='item-2'>
          <Accordion.Header>
            <Accordion.Trigger>
              <Text className='text-foreground text-xl'>Trigger 2</Text>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Text className='text-foreground text-xl'>Content 2</Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </ScrollView>
  );
}
