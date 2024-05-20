import { FlashList, ListRenderItem } from '@shopify/flash-list';
import * as React from 'react';
import { GestureResponderEvent, Text, View, ViewStyle } from 'react-native';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../../components/deprecated-ui/popover';
import { Check } from '../../lib/icons/Check';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';
import { Button, buttonTextVariants } from './button';

const SELECT_ITEM_HEIGHT = 50;

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  items: SelectOption[];
  value: SelectOption | null;
  onValueChange?: (value: SelectOption | null) => void;
}
interface SelectContext {
  items: SelectOption[];
  selected: SelectOption | null;
  onValueChange?: (value: SelectOption | null) => void;
}

const SelectContext = React.createContext<SelectContext>({} as SelectContext);

const Select = React.forwardRef<
  React.ElementRef<typeof Popover>,
  React.ComponentPropsWithoutRef<typeof Popover> & SelectProps
>(({ onValueChange, value, items, ...props }, ref) => {
  return (
    <SelectContext.Provider
      value={{
        items,
        selected: value,
        onValueChange,
      }}
    >
      <Popover ref={ref} {...props} />
    </SelectContext.Provider>
  );
});

Select.displayName = 'Select';

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components cannot be rendered outside the Select component');
  }
  return context;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, 'children'> & {
    placeholder: string;
  }
>(({ variant = 'outline', placeholder = 'Select...', ...props }, ref) => {
  const { selected } = useSelectContext();
  return (
    <PopoverTrigger ref={ref} size='sm' variant='outline' className='w-full' {...props}>
      {({ pressed }) => (
        <View className='flex-1 flex-row justify-between items-center'>
          <Text
            className={buttonTextVariants({
              variant: 'outline',
              size: 'sm',
              className: cn(
                !selected?.value && 'opacity-50',
                !selected?.value && pressed && 'opacity-30',
                selected?.value && pressed && 'opacity-70'
              ),
            })}
          >
            {selected?.value ?? placeholder}
          </Text>
          <ChevronDown
            className={buttonTextVariants({
              variant: 'outline',
              className: 'opacity-50',
            })}
          />
        </View>
      )}
    </PopoverTrigger>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

const SelectList = React.forwardRef<
  React.ElementRef<typeof FlashList<SelectOption>>,
  Omit<
    React.ComponentPropsWithoutRef<typeof FlashList<SelectOption>>,
    'data' | 'estimatedItemSize' | 'initialScrollIndex'
  > & {
    containerProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
  }
>(({ containerProps, extraData, ...props }, ref) => {
  const { selected, items } = useSelectContext();

  const { initialScrollIndex, contentStyle } = React.useMemo(() => {
    return {
      initialScrollIndex: selected
        ? items.findIndex((item) => item.value === selected.value)
        : undefined,
      contentStyle: { height: items.length * SELECT_ITEM_HEIGHT },
    };
  }, [selected, items]);

  return (
    <PopoverContent style={contentStyle} className='p-0 max-h-[30%]' {...containerProps}>
      <FlashList<SelectOption>
        ref={ref}
        data={items}
        estimatedItemSize={SELECT_ITEM_HEIGHT - 1}
        initialScrollIndex={initialScrollIndex}
        extraData={[selected, extraData]}
        {...props}
      />
    </PopoverContent>
  );
});

SelectList.displayName = 'SelectList';

type RenderSelectItem = ListRenderItem<SelectOption>;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof PopoverClose>,
  Omit<React.ComponentPropsWithoutRef<typeof PopoverClose>, 'children' | 'style' | 'asChild'> & {
    index: number;
    item: SelectOption;
    style?: ViewStyle;
  }
>(({ variant = 'outline', index, item, onPress, style, className, ...props }, ref) => {
  const { selected, onValueChange } = useSelectContext();

  function handleOnPress(ev: GestureResponderEvent) {
    onPress?.(ev);
    if (selected?.value === item.value) {
      onValueChange?.(null);
    }
    onValueChange?.(item);
  }
  return (
    <PopoverClose asChild>
      <Button
        ref={ref}
        variant={'ghost'}
        className={cn(
          index === 0 ? '' : 'border-t border-border',
          'justify-start gap-3 pl-3 w-full',
          className
        )}
        onPress={handleOnPress}
        style={[{ height: SELECT_ITEM_HEIGHT }, style]}
        {...props}
      >
        {({ pressed }) => (
          <>
            <View>
              <Check
                className={cn(
                  'text-primary',
                  buttonTextVariants({
                    variant: 'ghost',
                    className: selected?.value === item.value ? '' : 'opacity-0',
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
              {item.label}
            </Text>
          </>
        )}
      </Button>
    </PopoverClose>
  );
});

SelectItem.displayName = 'SelectItem';

export { Select, SelectItem, SelectList, SelectTrigger, type RenderSelectItem, type SelectOption };
