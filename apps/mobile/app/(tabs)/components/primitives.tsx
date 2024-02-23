import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/typography';
import { PRIMITIVES } from '~/lib/constants';
import { cn } from '~/lib/utils';

export default function PrimitivesScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const data = !search
    ? PRIMITIVES
    : PRIMITIVES.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <View className='flex-1 px-4'>
      <View className='py-4'>
        <Input
          placeholder='Search Primitives...'
          clearButtonMode='always'
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlashList
        ref={ref}
        data={data}
        className='overflow-hidden rounded-t-lg'
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Button
            disabled
            variant='secondary'
            size='lg'
            className={cn(
              'opacity-100 bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-center',
              index === 0 && 'rounded-t-lg',
              index === data.length - 1 && 'border-b rounded-b-lg'
            )}
          >
            <Text className='text-xl'>{toOptions(item)}</Text>
          </Button>
        )}
        ListFooterComponent={<View className='py-4' />}
      />
    </View>
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
