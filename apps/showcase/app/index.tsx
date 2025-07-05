import { Button } from '@/registry/new-york/components/ui/button';
import { Icon } from '@/registry/new-york/components/ui/icon';
import { Input } from '@/registry/new-york/components/ui/input';
import { Text } from '@/registry/new-york/components/ui/text';
import { cn } from '@/registry/new-york/lib/utils';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { COMPONENTS } from '@showcase/lib/constants';
import { Link, useNavigation } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useReanimatedHeaderHeight } from 'react-native-screens/reanimated';

cssInterop(FlashList, { className: 'style', contentContainerClassName: 'contentContainerStyle' });

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const headerHeight = useReanimatedHeaderHeight();

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <FlashList
      ref={ref}
      data={data}
      contentInsetAdjustmentBehavior='automatic'
      contentContainerClassName='px-4'
      estimatedItemSize={49}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <View className='pb-4'>
          <Input
            placeholder='Components'
            clearButtonMode='always'
            value={search}
            onChangeText={setSearch}
          />
        </View>
      }
      renderItem={({ item, index }) => (
        <Link href={`/${item.name}`} asChild>
          <Button
            variant='outline'
            size='lg'
            unstable_pressDelay={100}
            className={cn(
              'pl-4 pr-3.5 dark:bg-background border-b-0 border-border rounded-none flex-row justify-between',
              index === 0 && 'rounded-t-lg',
              index === data.length - 1 && 'border-b rounded-b-lg'
            )}
          >
            <View className='flex-row items-center gap-4'>
              <Icon as={item.icon} className='text-muted-foreground size-4' />
              <Text className='text-base font-normal'>{toOptions(item.name)}</Text>
            </View>
            <Icon as={ChevronRight} className='text-muted-foreground size-4 stroke-[1.5px]' />
          </Button>
        </Link>
      )}
      ListFooterComponent={<View className='py-4' />}
    />
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}
