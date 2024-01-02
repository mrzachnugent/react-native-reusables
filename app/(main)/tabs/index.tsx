import { useLocalSearchParams } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Tabs, TabsView, type RenderTabsViewProps } from '~/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

const DATA = ['Blue', 'Red', 'Green', 'Orange', 'Purple', 'Fuchsia'];

export default function TabsScreen() {
  const tabsRef = React.useRef<React.ElementRef<typeof Tabs>>(null);
  const params = useLocalSearchParams<{ active?: string }>();

  const renderTabs = React.useCallback(
    (props: RenderTabsViewProps) => {
      function scrollToRandomTab() {
        let index = Math.floor(Math.random() * DATA.length);
        if (index === props.index) {
          index = Math.floor(Math.random() * DATA.length);
        }
        tabsRef.current?.scrollToIndex({ index, animated: true });
      }
      switch (props.item) {
        case 'Blue':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        case 'Red':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        case 'Green':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        case 'Orange':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        case 'Purple':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        case 'Fuchsia':
          return (
            <CustomTabsView {...props} scrollToRandomTab={scrollToRandomTab} />
          );
        default:
          return null;
      }
    },
    [tabsRef.current]
  );

  return (
    <>
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <Tabs
        ref={tabsRef}
        tabs={DATA}
        renderTabs={renderTabs}
        onTabChange={(tab) => {
          console.log('Active tab:', tab.item);
        }}
        initialIndex={DATA.indexOf(params?.active ?? 'Blue')}
      />
    </>
  );
}

function CustomTabsView(
  props: RenderTabsViewProps & { scrollToRandomTab: () => void }
) {
  return (
    <TabsView {...props}>
      <ScrollView contentContainerClassName='flex-1'>
        <View className='flex-1 justify-center items-center gap-6'>
          <Text
            className='text-3xl font-bold'
            style={{ color: props.item.toLowerCase() }}
          >
            {props.item}
          </Text>
          <Button variant='link' onPress={props.scrollToRandomTab}>
            Scroll to random tab
          </Button>
        </View>
        <View className='p-4 w-full'>
          <Alert icon='Code' className='max-w-xl'>
            <AlertTitle>FYI</AlertTitle>
            <AlertDescription>
              This reusable does not use "rn-primitives"
            </AlertDescription>
          </Alert>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </TabsView>
  );
}
