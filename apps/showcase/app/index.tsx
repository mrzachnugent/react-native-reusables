import { Button } from '@/registry/new-york/components/ui/button';
import { Icon } from '@/registry/new-york/components/ui/icon';
import { Input } from '@/registry/new-york/components/ui/input';
import { Text } from '@/registry/new-york/components/ui/text';
import { cn } from '@/registry/new-york/lib/utils';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { COMPONENTS } from '@showcase/lib/constants';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

cssInterop(FlashList, { className: 'style', contentContainerClassName: 'contentContainerStyle' });

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <FlashList
      ref={ref}
      data={data}
      contentInsetAdjustmentBehavior='automatic'
      className='rounded-t-lg'
      contentContainerClassName='px-4'
      estimatedItemSize={49}
      showsVerticalScrollIndicator={false}
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
        <Link href={`/${item}`} asChild>
          <Button
            variant='outline'
            size='lg'
            unstable_pressDelay={100}
            className={cn(
              'pl-4 pr-2.5  border-b-0 border-border rounded-none flex-row justify-between',
              index === 0 && 'rounded-t-lg',
              index === data.length - 1 && 'border-b rounded-b-lg'
            )}
          >
            <Text className='text-base'>{toOptions(item)}</Text>
            <Icon as={ChevronRight} className='text-foreground/50 size-4' />
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
