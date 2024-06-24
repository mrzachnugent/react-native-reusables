import * as Slot from '@rn-primitives/slot';
import { type ListRenderItemInfo } from '@shopify/flash-list';
import React, { useImperativeHandle } from 'react';
import { GestureResponderEvent, Modal, Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp, SlideInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search } from '../../lib/icons/Search';
import { X } from '../../lib/icons/X';
import { useKeyboard } from '../../lib/keyboard';
import { cn, isTextChildren } from '../../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { SectionList } from './section-list';

// TODO: refactor and move to UI
// TODO: create web component, use https://ui.shadcn.com/docs/components/command

type Data = Record<string, unknown> | string;

interface CommandProps<T extends Data> {
  data: T[];
  onItemSelected: (item: Exclude<T, string>) => void;
  filterFn: (search: string, item: Exclude<T, string>) => boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSearch?: (search: string) => void;
}

interface CommandContext<T extends Data> {
  data: T[];
  onItemSelected: (item: Exclude<T, string>) => void;
  isOpen: boolean;
  toggleIsOpen: () => void;
  search: string;
  handleOnSearch: (search: string) => void;
}

const CommandContext = React.createContext<CommandContext<any>>({} as CommandContext<any>);

type CommandWrapperProps<T extends Data> = React.ComponentPropsWithoutRef<typeof View> &
  CommandProps<T>;

function CommandWrapper<T extends Data>(
  {
    data: dataFromProps,
    defaultOpen = false,
    onOpenChange,
    onSearch,
    onItemSelected,
    filterFn,
    ...props
  }: CommandWrapperProps<T>,
  ref?: React.ForwardedRef<View>
) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [search, setSearch] = React.useState('');

  const data = React.useMemo(() => {
    const items = dataFromProps.filter((item) => {
      if (typeof item === 'string') return true;
      return filterFn(search, item as Exclude<T, string>);
    });
    return items.filter((item, index) => {
      if (typeof item === 'string') {
        const nextItem = items[index + 1];
        return nextItem && typeof nextItem !== 'string';
      }
      return true;
    });
  }, [search, dataFromProps, filterFn]);

  function toggleIsOpen() {
    setIsOpen((prev) => {
      const newVal = !prev;
      onOpenChange?.(newVal);
      return newVal;
    });
    if (search) {
      setSearch('');
    }
  }

  function handleOnSearch(search: string) {
    setSearch(search);
    onSearch?.(search);
  }

  return (
    <CommandContext.Provider
      value={{
        data: data,
        onItemSelected,
        isOpen,
        toggleIsOpen,
        search,
        handleOnSearch,
      }}
    >
      <View ref={ref} {...props} />
    </CommandContext.Provider>
  );
}

interface WithForwardRefCommand extends React.FC<CommandWrapperProps<Data>> {
  <T extends Data>(props: CommandWrapperProps<T>): ReturnType<React.FC<CommandWrapperProps<T>>>;
}

const Command: WithForwardRefCommand = React.forwardRef(CommandWrapper);

Command.displayName = 'Command';

function useCommandContext<T extends Data>() {
  const context = React.useContext<CommandContext<T>>(CommandContext);
  if (!context) {
    throw new Error('Command compound components cannot be rendered outside the Command component');
  }
  return context;
}

function CommandPressable<T extends Data>(
  {
    onPress,
    asChild = false,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  },
  ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>
) {
  const { toggleIsOpen } = useCommandContext<T>();

  function handleOnPress(event: GestureResponderEvent) {
    toggleIsOpen();
    onPress?.(event);
  }

  const Trigger = asChild ? Slot.Pressable : Pressable;
  return <Trigger onPress={handleOnPress} ref={ref} {...props} />;
}

const CommandTrigger = React.forwardRef(CommandPressable);

CommandTrigger.displayName = 'CommandTrigger';

function CommandModal<T extends Data>(
  {
    className,
    children,
    animationType = 'fade',
    overlayClass,
    style,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Modal> & {
    overlayClass?: string;
  },
  ref: React.ForwardedRef<React.ElementRef<typeof Modal>>
) {
  const insets = useSafeAreaInsets();
  const { keyboardHeight } = useKeyboard();
  const { toggleIsOpen, isOpen } = useCommandContext<T>();

  return (
    <Modal
      ref={ref}
      animationType={animationType}
      transparent={true}
      visible={isOpen}
      aria-modal
      onRequestClose={toggleIsOpen}
      statusBarTranslucent
      {...props}
    >
      <View aria-hidden={isOpen} className={cn('flex-1 ', overlayClass)}>
        <Pressable
          onPressOut={toggleIsOpen}
          className={cn('flex-1', className)}
          style={{
            paddingTop: insets.top + 8,
          }}
        >
          <Animated.View entering={FadeInUp.delay(200)} className='flex-1 bg-zinc-900/30'>
            {children}
            <Pressable onPressOut={toggleIsOpen} style={{ height: keyboardHeight }} />
          </Animated.View>
        </Pressable>
      </View>
    </Modal>
  );
}

const CommandContent = React.forwardRef(CommandModal);
CommandContent.displayName = 'CommandContent';

function CommandTextInput<T extends Data>(
  { className, placeholderClassName, ...props }: React.ComponentPropsWithoutRef<typeof Input>,
  ref: React.ForwardedRef<React.ElementRef<typeof Input>>
) {
  const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);
  const { search, handleOnSearch, data, onItemSelected, toggleIsOpen } = useCommandContext<T>();

  useImperativeHandle(
    ref,
    () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
    },
    [inputRef.current]
  );

  function onSubmitEditing() {
    const firstItem = data.find((item) => typeof item !== 'string');
    if (firstItem && typeof firstItem !== 'string') {
      onItemSelected(firstItem as Exclude<T, string>);
    }
    toggleIsOpen();
  }

  function onSearchIconPress() {
    inputRef.current?.focus();
  }

  return (
    <Animated.View
      entering={SlideInUp}
      className='relative px-4 flex-row items-center pb-4 bg-background z-50'
    >
      <Input
        role='searchbox'
        ref={inputRef}
        className='pl-12 flex-1'
        value={search}
        onChangeText={handleOnSearch}
        onSubmitEditing={onSubmitEditing}
        returnKeyType='go'
        returnKeyLabel='Select'
        clearButtonMode='while-editing'
        placeholder='Type a command or search...'
        autoFocus
        {...props}
      />
      <Button
        variant={'ghost'}
        size='sm'
        className='absolute left-5 top-1.5'
        onPress={onSearchIconPress}
      >
        <Search size={18} className='text-foreground opacity-50' />
      </Button>
      <Button variant={'ghost'} className='pr-0 pl-3' size='sm' onPress={toggleIsOpen}>
        <X size={24} className='text-muted-foreground' />
      </Button>
    </Animated.View>
  );
}

const CommandInput = React.forwardRef(CommandTextInput);
CommandInput.displayName = 'CommandInput';

type CommandSectionListProps<T extends Data> = Omit<
  React.ComponentPropsWithoutRef<typeof SectionList<T>>,
  'data'
> & {
  headerHeight?: number;
  itemHeight?: number;
};

function CommandSectionList<T extends Data>(
  {
    headerHeight = 43,
    itemHeight = 57,
    className,
    extraData,
    ...props
  }: CommandSectionListProps<T>,
  ref: React.ForwardedRef<React.ElementRef<typeof SectionList<T>>>
) {
  const { data, search } = useCommandContext<T>();

  function overrideItemLayout(layout: any, item: any) {
    if (typeof item === 'string') {
      layout.size = headerHeight;
    }
    layout.size = itemHeight;
  }

  return (
    <View
      style={{ minHeight: 2 }}
      className={cn('flex-1 rounded-b-2xl overflow-hidden relative', className)}
    >
      <View className='absolute top-0 right-0 left-0 h-14 bg-background' />
      <SectionList<T>
        ref={ref}
        data={data}
        extraData={[search, extraData]}
        estimatedItemSize={itemHeight}
        overrideItemLayout={overrideItemLayout}
        keyboardShouldPersistTaps='handled'
        role='menu'
        {...props}
      />
    </View>
  );
}
interface WithForwardRefCommandList extends React.FC<CommandSectionListProps<Data>> {
  <T extends Data>(props: CommandSectionListProps<T>): ReturnType<
    React.FC<
      Omit<React.ComponentPropsWithoutRef<typeof SectionList<T>>, 'data'> & {
        headerHeight?: number;
        itemHeight?: number;
      }
    >
  >;
}

const CommandList: WithForwardRefCommandList = React.forwardRef(CommandSectionList);
CommandList.displayName = 'CommandList';

const CommandListHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { textClass?: string }
>(({ className, textClass, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn('px-5 pt-6 bg-background border-t border-border', className)}
      {...props}
    >
      {isTextChildren(children) ? (
        <Text className={cn('text-muted-foreground text-base font-semibold px-0.5', textClass)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

type CommandListHeaderProps = ListRenderItemInfo<string>;

CommandListHeader.displayName = 'CommandListHeader';

function CommandSectionListItem<T extends Data>(
  {
    className,
    index,
    containnerClass,
    onPress,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Button> & {
    index: number;
    containnerClass?: string;
  },
  ref: React.ForwardedRef<React.ElementRef<typeof Button>>
) {
  const { data, onItemSelected, toggleIsOpen } = useCommandContext<T>();

  function handleOnPress(event: GestureResponderEvent) {
    const item = data[index];
    if (typeof item === 'string' || !item) return;
    onItemSelected(item as Exclude<T, string>);
    onPress?.(event);
    toggleIsOpen();
  }

  return (
    <Pressable
      className={cn(
        'px-3 py-1 bg-background ',
        index === data.length - 1 && 'rounded-b-2xl pb-3',
        containnerClass
      )}
    >
      <Button
        ref={ref}
        variant={index === 1 ? 'secondary' : 'ghost'}
        className={cn('flex-row flex-1 items-center justify-start px-2 gap-3')}
        onPress={handleOnPress}
        role='menuitem'
        {...props}
      >
        {children}
      </Button>
    </Pressable>
  );
}

type CommandListItemProps<T extends Data> = ListRenderItemInfo<T>;

const CommandListItem = React.forwardRef(CommandSectionListItem);

CommandListItem.displayName = 'CommandListItem';

export {
  Command,
  CommandContent,
  CommandInput,
  CommandList,
  CommandListHeader,
  CommandListItem,
  CommandTrigger,
  type CommandListHeaderProps,
  type CommandListItemProps,
};
