import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { ChevronRight } from '~/components/Icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/typography';
import { COMPONENTS } from '~/lib/constants';
import { cn } from '~/lib/utils';

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <View className='flex-1 px-4'>
      <View className='py-4'>
        <Input
          placeholder='Search...'
          clearButtonMode='always'
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlashList
        data={data}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        className='overflow-hidden rounded-lg'
        renderItem={({ item, index }) => (
          <Link
            href={{
              pathname: `/(main)/${item}`,
              params: { showBackButton: 'true' },
            }}
            asChild
          >
            <Button
              variant='secondary'
              size='lg'
              className={cn(
                'pl-4 pr-1.5 border-foreground/5 rounded-none flex-row justify-between',
                index === 0 ? 'rounded-t-lg' : 'border-t',
                index === data.length - 1 && 'border-b-1 rounded-b-lg'
              )}
            >
              <Text className='text-xl'>{toOptions(item)}</Text>
              <ChevronRight className='text-foreground/50' />
            </Button>
          </Link>
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
