import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as RNRAccordion,
} from '~/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

export default function AccordionScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <RNRAccordion className='w-full max-w-xl'>
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
            <View className='p-12 bg-red-500'></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl'>Item #3</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-24 bg-purple-500'></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className='text-foreground text-xl'>Item #4</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className='p-8 bg-orange-500'></View>
          </AccordionContent>
        </AccordionItem>
      </RNRAccordion>
      <View className='p-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </ScrollView>
  );
}
