import Drawer from 'expo-router/drawer';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as RNRAccordion,
} from '~/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { RenderTabsViewProps, Tabs, TabsView } from '~/components/ui/tabs';
import * as Accordion from '~/lib/rn-primitives/accordion';

const DATA = ['RN Reusable', 'Primitive'];

export default function AccordionScreen() {
  const ref = React.useRef<React.ElementRef<typeof Accordion.Trigger>>(null);
  const renderTabs = React.useCallback((props: RenderTabsViewProps) => {
    switch (props.item) {
      case 'RN Reusable':
        return (
          <TabsView {...props}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RNRAccordion className='w-full max-w-xl'>
                <AccordionItem>
                  <AccordionTrigger>
                    <Text className='text-foreground text-xl pb-1.5'>
                      Item #1
                    </Text>
                    <Text className='text-foreground opacity-90'>
                      Subtext example
                    </Text>
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
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    This reusable does not use "primitives".
                  </AlertDescription>
                </Alert>
              </View>
            </ScrollView>
          </TabsView>
        );
      case 'Primitive':
        return (
          <TabsView {...props}>
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
          </TabsView>
        );
      default:
        return null;
    }
  }, []);

  return (
    <>
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <Tabs tabs={DATA} renderTabs={renderTabs} initialIndex={0} />
    </>
  );
}
