import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '~/lib/utils';
import { Button } from './button';

const { height, width } = Dimensions.get('window');

const HEADER_HEIGHT = 50;

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

type TabsListProps = React.ComponentProps<typeof FlashList<string>>;
type OnViewableItemsChangedInfo = Parameters<
  NonNullable<TabsListProps['onViewableItemsChanged']>
>[0];
type RenderTabsViewProps = Parameters<
  NonNullable<TabsListProps['renderItem']>
>[0];

/**
 * @description Full Single Screen Top Tabs
 * @note If you want each tab to be its own screen, you can use Material Top Tabs (https://github.com/EvanBacon/expo-router-layouts-example/blob/main/layouts/material-bottom-tabs.tsx);
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof FlashList<string>>,
  Omit<
    React.ComponentPropsWithoutRef<typeof FlashList>,
    'renderItem' | 'data'
  > & {
    tabs: string[];
    renderTabs: (props: RenderTabsViewProps) => React.JSX.Element | null;
    onTabChange?: (
      index: OnViewableItemsChangedInfo['changed'][number]
    ) => void;
    initialIndex?: number;
  }
>(({ tabs, renderTabs, onTabChange, initialIndex = 0, ...props }, ref) => {
  const headerListRef =
    React.useRef<React.ElementRef<typeof FlashList<any>>>(null);
  const tabsListRef =
    React.useRef<React.ElementRef<typeof FlashList<any>>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewableItemsChanged = React.useCallback(
    (info: OnViewableItemsChangedInfo) => {
      const changed = info.changed[0];
      const index = changed?.index;

      if (!changed || typeof index !== 'number') return;
      setCurrentIndex(index);
      headerListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      onTabChange?.(changed);
    },
    [onTabChange]
  );

  const renderItem = React.useCallback(
    ({ index, item }: RenderTabsViewProps) => {
      return (
        <Button
          variant={'ghost'}
          onPress={() => {
            setCurrentIndex(index);
            tabsListRef.current?.scrollToIndex({
              index,
              animated: false,
            });
            headerListRef.current?.scrollToIndex({
              index,
              animated: true,
            });
          }}
          className={cn(
            'border-b-2 px-8 py-4',
            currentIndex === index ? 'border-foreground' : 'border-transparent'
          )}
          textClass={cn(
            'text-base font-semibold tracking-wider text-foreground',
            currentIndex !== index && 'opacity-70'
          )}
        >
          {item}
        </Button>
      );
    },
    [currentIndex]
  );

  React.useImperativeHandle(
    ref,
    () => {
      if (!tabsListRef.current) {
        return {} as React.ComponentRef<typeof FlashList<string>>;
      }
      return tabsListRef.current;
    },
    [tabsListRef.current]
  );

  return (
    <View style={{ height }} {...props}>
      <View
        style={[{ height: HEADER_HEIGHT }]}
        className='border-b-hairline border-border'
      >
        <FlashList
          data={tabs}
          ref={headerListRef}
          horizontal
          estimatedItemSize={100}
          extraData={currentIndex}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
          renderItem={renderItem}
          initialScrollIndex={initialIndex}
        />
      </View>
      <FlashList
        role='tab'
        ref={tabsListRef}
        data={tabs}
        horizontal
        estimatedItemSize={width}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderTabs}
        initialScrollIndex={initialIndex}
      />
    </View>
  );
});

Tabs.displayName = 'Tabs';

function TabsView({ children }: { children: React.ReactNode }) {
  const drawerHaderHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityRole='tablist'
      style={{
        height: height - HEADER_HEIGHT - drawerHaderHeight,
        width,
        paddingBottom: insets.bottom,
      }}
    >
      {children}
    </View>
  );
}

export { Tabs, TabsView, type RenderTabsViewProps };
