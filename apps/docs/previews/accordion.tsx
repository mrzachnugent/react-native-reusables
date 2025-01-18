import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';

export function AccordionPreview() {
  return (
    <Accordion type='multiple' collapsible className='w-full max-w-sm native:max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Text className='web:text-sm'>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className='web:text-sm'>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <Text className='web:text-sm'>What are universal components?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className='web:text-sm'>
            In the world of React Native, universal components are components that work on both web
            and native platforms.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>
          <Text className='web:text-sm'>Is this component universal?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className='web:text-sm'>Yes. Try it out on the web, iOS, and/or Android.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
