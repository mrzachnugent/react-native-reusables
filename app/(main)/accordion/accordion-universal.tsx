import * as React from 'react';
import { Text, View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

export default function AccordionPrimitiveScreen() {
  const [multiple, setMultiple] = React.useState<string[]>(['item-1']);

  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Accordion
        type='multiple'
        collapsible
        value={multiple}
        onValueChange={setMultiple}
        className='w-full max-w-sm'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text className='text-foreground text-base native:text-lg font-medium web:group-hover:underline'>
              Is it accessible?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text className='text-foreground text-base native:text-lg'>
              Yes. It adheres to the WAI-ARIA design pattern.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text className='text-secondary-foreground font-medium text-base native:text-lg web:group-hover:underline'>
              What are universal components?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text className='text-foreground text-base native:text-lg'>
              In the world of React Native, universal components are components
              that work on both web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            <Text className='text-foreground text-base native:text-lg font-medium web:group-hover:underline'>
              Is this component universal?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text className='text-foreground text-base native:text-lg'>
              Yes. Try it out on the web, iOS, and/or Android.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
