import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PRIMITIVES } from '@showcase/lib/constants';
import { ExternalLink } from '@/lib/icons/ExternalLink';
import { cn } from '@/lib/utils';

export default function PrimitivesScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const data = !search
    ? PRIMITIVES
    : PRIMITIVES.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
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
        className='native:overflow-hidden rounded-t-lg'
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Link href={`https://rnprimitives.com/${item}`} asChild>
            <Button
              variant='secondary'
              size='lg'
              className={cn(
                'bg-secondary/40 px-4 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
                index === 0 && 'rounded-t-lg',
                index === data.length - 1 && 'border-b rounded-b-lg'
              )}
            >
              <Text className='text-xl'>@rn-primitives/{item}</Text>
              <ExternalLink size={16} className='text-foreground/50' />
            </Button>
          </Link>
        )}
        ListFooterComponent={<View className='py-4' />}
      />
    </View>
  );
}
