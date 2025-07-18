import { cn } from '@/registry/new-york/lib/utils';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Button, Icon, Input, Text } from '@showcase/components/styles/ui';
import { COMPONENTS } from '@showcase/lib/constants';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Platform, View } from 'react-native';

cssInterop(FlashList, { className: 'style', contentContainerClassName: 'contentContainerStyle' });

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className='max-w-lg mx-auto w-full flex-1 web:p-4'>
      <FlashList
        ref={ref}
        data={data}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerClassName='px-4'
        estimatedItemSize={49}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Platform.select({
          native: (
            <View className='pb-4'>
              <Input
                placeholder='Components'
                clearButtonMode='always'
                onChangeText={setSearch}
                autoCorrect={false}
              />
            </View>
          ),
        })}
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
