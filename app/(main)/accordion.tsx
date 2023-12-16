import { View, Text } from 'react-native';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/components/ui/accordion';

export default function AccordionScreen() {
  return (
    <View className='flex-1 justify-center'>
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl pb-1.5'>Item #1</Text>
            <Text className='text-foreground opacity-90'>Subtext example</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-20 bg-blue-500'></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl'>Item #2</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-10 bg-red-500'></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl'>Item #3</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-10 bg-purple-500'></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl'>Item #4</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-10 bg-orange-500'></View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
