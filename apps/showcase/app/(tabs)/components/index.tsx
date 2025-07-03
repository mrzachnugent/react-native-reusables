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
import * as React from 'react';
import { View } from 'react-native';

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  return (
    <View className='flex-1 px-4'>
      <FlashList
        ref={ref}
        data={data}
        className='native:overflow-hidden rounded-t-lg'
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className='py-4'>
            <Input
              placeholder='Search UI...'
              clearButtonMode='always'
              value={search}
              onChangeText={setSearch}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <Link href={`/${item}`} asChild>
            <Button
              variant='secondary'
              size='lg'
              className={cn(
                'bg-secondary/40 pl-4 pr-2.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between h-12',
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
