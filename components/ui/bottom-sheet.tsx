import type {
  BottomSheetBackdropProps,
  BottomSheetFooterProps as GBottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFlatList as GBottomSheetFlatList,
  BottomSheetView as GBottomSheetView,
  BottomSheetTextInput as GBottomSheetTextInput,
  BottomSheetFooter as GBottomSheetFooter,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useImperativeHandle } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAV_THEME } from '~/lib/constants';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { X } from 'lucide-react-native';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type BottomSheetRef = React.ElementRef<typeof View>;
type BottomSheetProps = React.ComponentPropsWithoutRef<typeof View>;

interface BottomSheetContext {
  sheetRef: React.RefObject<BottomSheetModal>;
}

const BottomSheetContext = React.createContext({} as BottomSheetContext);

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ ...props }, ref) => {
    const sheetRef = React.useRef<BottomSheetModal>(null);

    return (
      <BottomSheetContext.Provider value={{ sheetRef: sheetRef }}>
        <View ref={ref} {...props} />
      </BottomSheetContext.Provider>
    );
  }
);

function useBottomSheetContext() {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      'BottomSheet compound components cannot be rendered outside the BottomSheet component'
    );
  }
  return context;
}

const CLOSED_INDEX = -1;

type BottomSheetContentRef = React.ElementRef<typeof BottomSheetModal>;

type BottomSheetContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>,
  'backdropComponent'
> & {
  backdropProps?: Partial<
    React.ComponentPropsWithoutRef<typeof BottomSheetBackdrop>
  >;
};

const BottomSheetContent = React.forwardRef<
  BottomSheetContentRef,
  BottomSheetContentProps
>(
  (
    {
      enablePanDownToClose = true,
      enableDynamicSizing = true,
      index = 0,
      backdropProps,
      backgroundStyle,
      android_keyboardInputMode = 'adjustResize',
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const { sheetRef } = useBottomSheetContext();

    useImperativeHandle(
      ref,
      () => {
        if (!sheetRef.current) {
          return {} as BottomSheetModalMethods;
        }
        return sheetRef.current;
      },
      [sheetRef.current]
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => {
        const {
          pressBehavior = 'close',
          opacity = colorScheme === 'dark' ? 0.3 : 0.7,
          disappearsOnIndex = CLOSED_INDEX,
          style,
          ...rest
        } = {
          ...props,
          ...backdropProps,
        };
        return (
          <BottomSheetBackdrop
            opacity={opacity}
            disappearsOnIndex={disappearsOnIndex}
            pressBehavior={pressBehavior}
            style={[{ backgroundColor: NAV_THEME[colorScheme].border }, style]}
            {...rest}
          />
        );
      },
      [backdropProps, colorScheme]
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={enableDynamicSizing}
        backgroundStyle={[
          { backgroundColor: NAV_THEME[colorScheme].card },
          backgroundStyle,
        ]}
        handleIndicatorStyle={{
          backgroundColor: NAV_THEME[colorScheme].text,
        }}
        topInset={insets.top}
        android_keyboardInputMode={android_keyboardInputMode}
        {...props}
      />
    );
  }
);

const BottomSheetOpenTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { sheetRef } = useBottomSheetContext();
  function handleOnPress(ev: GestureResponderEvent) {
    sheetRef.current?.present();
    onPress?.(ev);
  }
  return <Pressable ref={ref} onPress={handleOnPress} {...props} />;
});

const BottomSheetCloseTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { dismiss } = useBottomSheetModal();
  function handleOnPress(ev: GestureResponderEvent) {
    dismiss();
    onPress?.(ev);
  }
  return <Pressable ref={ref} onPress={handleOnPress} {...props} />;
});

const ADDED_INSET = 60; // https://github.com/gorhom/react-native-bottom-sheet/issues/294

type BottomSheetViewProps = React.ComponentPropsWithoutRef<
  typeof GBottomSheetView
>;

function BottomSheetView({
  className,
  children,
  ...props
}: BottomSheetViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetView
      style={{ paddingBottom: insets.bottom + ADDED_INSET }}
      className={cn(`px-4`, className)}
      {...props}
    >
      {children}
    </GBottomSheetView>
  );
}

type BottomSheetTextInputRef = React.ElementRef<typeof GBottomSheetTextInput>;
type BottomSheetTextInputProps = React.ComponentPropsWithoutRef<
  typeof GBottomSheetTextInput
>;
const BottomSheetTextInput = React.forwardRef<
  BottomSheetTextInputRef,
  BottomSheetTextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <GBottomSheetTextInput
      ref={ref}
      className={cn(
        'rounded-md border border-input bg-background px-3 text-xl h-14 leading-[1.25] text-foreground items-center  placeholder:text-muted-foreground disabled:opacity-50',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});

type BottomSheetFlatListRef = React.ElementRef<typeof GBottomSheetFlatList>;
type BottomSheetFlatListProps = React.ComponentPropsWithoutRef<
  typeof GBottomSheetFlatList
>;
const BottomSheetFlatList = React.forwardRef<
  BottomSheetFlatListRef,
  BottomSheetFlatListProps
>(({ className, ...props }, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFlatList
      ref={ref}
      contentContainerStyle={[{ paddingBottom: insets.bottom }]}
      className={cn('py-4', className)}
      keyboardShouldPersistTaps='handled'
      {...props}
    />
  );
});

type BottomSheetHeaderRef = React.ElementRef<typeof View>;
type BottomSheetHeaderProps = React.ComponentPropsWithoutRef<typeof View>;
const BottomSheetHeader = React.forwardRef<
  BottomSheetHeaderRef,
  BottomSheetHeaderProps
>(({ className, children, ...props }, ref) => {
  const { dismiss } = useBottomSheetModal();
  function close() {
    dismiss();
  }
  return (
    <View
      ref={ref}
      className={cn(
        'border-b border-border flex-row items-center justify-between pl-4',
        className
      )}
      {...props}
    >
      {children}
      <Button onPress={close} variant='ghost' className='pr-4'>
        <X className='text-muted-foreground' size={24} />
      </Button>
    </View>
  );
});

type BottomSheetFooterRef = React.ElementRef<typeof View>;
type BottomSheetFooterProps = React.ComponentPropsWithoutRef<typeof View> & {
  bottomSheetFooterProps: GBottomSheetFooterProps;
  children?: React.ReactNode;
};

/**
 * To be used in a useCallback function as a props to BottomSheetContent
 */
const BottomSheetFooter = React.forwardRef<
  BottomSheetFooterRef,
  BottomSheetFooterProps
>(({ bottomSheetFooterProps, children, className, ...props }, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFooter {...bottomSheetFooterProps}>
      <View
        ref={ref}
        style={{ paddingBottom: insets.bottom + 6 }}
        className={cn('px-4 pt-1.5', className)}
        {...props}
      >
        {children}
      </View>
    </GBottomSheetFooter>
  );
});

function useBottomSheet() {
  const ref = React.useRef<BottomSheetContentRef>(null);

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, open, close };
}

export {
  BottomSheet,
  BottomSheetOpenTrigger,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetFlatList,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheet,
};
