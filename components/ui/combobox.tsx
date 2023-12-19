import { Check, ChevronsUpDown, Search } from 'lucide-react-native';
import React from 'react';
import { ListRenderItemInfo, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheet,
  BottomSheetFlatList,
  BottomSheetTextInput,
  useBottomSheet,
} from '~/components/ui/bottom-sheet';
import { Button, buttonTextVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const HEADER_HEIGHT = 56;

interface Option {
  label: string;
  value: string;
}

const Combobox = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'children'> & {
    items: Option[];
    placeholder?: string;
    inputProps?: React.ComponentPropsWithoutRef<typeof BottomSheetTextInput>;
    emptyText?: string;
  }
>(
  (
    {
      className,
      textClass,
      variant = 'outline',
      size,
      inputProps,
      placeholder,
      items,
      emptyText = 'Nothing found...',
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState<Option | null>(null);
    const bottomSheet = useBottomSheet();
    const inputRef =
      React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);

    const listItems = React.useMemo(() => {
      return search
        ? items.filter((item) => {
            return item.label
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          })
        : items;
    }, [items, search]);

    const renderItem = React.useCallback(
      ({ item }: ListRenderItemInfo<unknown>) => {
        const listItem = item as Option;
        return (
          <Button
            variant='ghost'
            size='lg'
            className='items-center flex-row justify-between px-3 py-5'
            style={{ minHeight: 70 }}
            onPress={() => {
              setSelectedItem((prev) => {
                if (prev?.value === listItem.value) {
                  return null;
                }
                setSearch('');
                bottomSheet.close();
                return listItem;
              });
            }}
          >
            <View className='flex-row flex-1'>
              <Text className={'text-foreground text-xl'}>
                {listItem.label}
              </Text>
            </View>
            {selectedItem?.value === listItem.value && (
              <Check size={27} className={'text-foreground px-6 mt-1.5'} />
            )}
          </Button>
        );
      },
      [selectedItem]
    );

    function onSubmitEditing() {
      const firstItem = listItems[0];
      if (!firstItem) return;
      setSelectedItem(firstItem);
      bottomSheet.close();
      setSearch('');
    }

    function onSearchIconPress() {
      if (!inputRef.current) return;
      const input = inputRef.current;
      if (input && 'focus' in input && typeof input.focus === 'function') {
        input.focus();
      }
    }

    return (
      <View className='flex-1 justify-center items-center'>
        <Button
          ref={ref}
          onPress={() => {
            bottomSheet.open();
          }}
          variant={variant}
          className={cn('flex-row', className)}
          role='combobox'
          {...props}
        >
          <View className='flex-1 flex-row justify-between'>
            <Text
              className={buttonTextVariants({
                variant,
                size,
                className: cn(!selectedItem && 'opacity-80', textClass),
              })}
              numberOfLines={1}
            >
              {selectedItem ? selectedItem.label : placeholder}
            </Text>
            <ChevronsUpDown className='text-foreground ml-2 opacity-50' />
          </View>
        </Button>
        <BottomSheet ref={bottomSheet.ref}>
          <View className='relative  mx-4 mt-4'>
            <BottomSheetTextInput
              role='searchbox'
              ref={inputRef}
              className='pl-12'
              value={search}
              onChangeText={setSearch}
              autoFocus
              onSubmitEditing={onSubmitEditing}
              returnKeyType='next'
              clearButtonMode='while-editing'
              {...inputProps}
            />
            <Button
              variant={'ghost'}
              size='sm'
              className='absolute left-1 top-2.5'
              onPress={onSearchIconPress}
            >
              <Search size={18} className='text-foreground opacity-50' />
            </Button>
          </View>
          <BottomSheetFlatList
            data={listItems}
            contentContainerStyle={{
              paddingBottom: insets.bottom + HEADER_HEIGHT,
            }}
            renderItem={renderItem}
            className={'px-4'}
            ListEmptyComponent={() => {
              return (
                <View
                  className='items-center flex-row justify-center flex-1  px-3 py-5'
                  style={{ minHeight: 70 }}
                >
                  <Text className={'text-muted-foreground text-xl text-center'}>
                    {emptyText}
                  </Text>
                </View>
              );
            }}
          />
        </BottomSheet>
      </View>
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
