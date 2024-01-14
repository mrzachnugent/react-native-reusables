import React from 'react';
import { ScrollView, Text } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/universal-ui/accordion';
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
      <Accordion
        type='multiple'
        collapsible
        value={multiple}
        onValueChange={setMultiple}
        className='w-full max-w-sm'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text className='text-foreground group-hover:underline'>
              Is it accessible?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text className='text-foreground'>
              Yes. It adheres to the WAI-ARIA design pattern.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text className='text-foreground group-hover:underline'>
              Is it fully universal?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text className='text-foreground'>
              Yes. Well, it should be, that's the goal
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollView>
  );
}
