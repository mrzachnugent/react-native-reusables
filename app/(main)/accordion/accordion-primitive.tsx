import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/ui/button';
import * as Accordion from '~/lib/rn-primitives/accordion';

export default function AccordionPrimitiveScreen() {
  const ref = React.useRef<React.ElementRef<typeof Accordion.Trigger>>(null);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Accordion.Root type='multiple' defaultValue={'item-1'}>
        <Accordion.Item value='item-1'>
          <Accordion.Header>
            <Accordion.Trigger ref={ref}>
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
      <View className='p-8' />
      <Button
        variant='link'
        onPress={() => {
          ref.current?.press?.();
        }}
      >
        Toggle Trigger 1 with ref
      </Button>
    </ScrollView>
  );
}
