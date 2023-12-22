import { FlashList } from '@shopify/flash-list';
import { Check, ChevronDown } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { buttonTextVariants } from './button';

const DATA = [
  'tom@cruise.com',
  'napoleon@dynamite.com',
  'kunfu@panda.com',
  'bruce@lee.com',
  'harry@potter.com',
  'jane@doe.com',
  'elon@musk.com',
  'lara@croft.com',
];

// TODO:
// Select (provider)
// Select Trigger
// Select Value
// Select List
// Select Item

export function Select() {
  const [selected, setSelected] = React.useState<(typeof DATA)[number] | null>(
    null
  );
  const listRef =
    React.useRef<React.ComponentRef<typeof FlashList<(typeof DATA)[number]>>>(
      null
    );

  return (
    <Popover>
      <PopoverTrigger variant='outline'>
        {({ pressed }) => (
          <View className='flex-1 flex-row justify-between items-center'>
            <Text
              className={buttonTextVariants({
                variant: 'outline',
                className: cn(
                  !selected && 'opacity-90',
                  pressed && 'opacity-70'
                ),
              })}
            >
              {selected ?? 'Select a verified email'}
            </Text>
            <ChevronDown
              className={buttonTextVariants({
                variant: 'outline',
                className: 'opacity-70',
              })}
            />
          </View>
        )}
      </PopoverTrigger>
      <PopoverContent
        style={{ height: DATA.length * 51 + 12 }}
        className='p-0 max-h-[30%]'
      >
        <FlashList
          ref={listRef}
          data={DATA}
          contentContainerStyle={{ padding: 8 }}
          estimatedItemSize={51}
          initialScrollIndex={selected ? DATA.indexOf(selected) : undefined}
          renderItem={({ item, index }) => (
            <PopoverClose
              variant={'ghost'}
              className={cn(
                index === 0 ? '' : 'border-t border-border',
                'justify-start gap-3 pl-3'
              )}
              onPress={() => {
                setSelected((prev) => (prev === item ? null : item));
              }}
            >
              {({ pressed }) => (
                <>
                  <View>
                    <Check
                      className={cn(
                        'text-primary',
                        buttonTextVariants({
                          variant: 'ghost',
                          className: selected === item ? '' : 'opacity-0',
                        })
                      )}
                    />
                  </View>
                  <Text
                    className={buttonTextVariants({
                      variant: 'ghost',
                      className: pressed ? 'opacity-70' : '',
                    })}
                  >
                    {item}
                  </Text>
                </>
              )}
            </PopoverClose>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
