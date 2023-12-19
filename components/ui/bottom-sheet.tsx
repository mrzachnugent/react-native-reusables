import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFlatList as GBottomSheetFlatList,
  BottomSheetView as GBottomSheetView,
  BottomSheetTextInput as GBottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAV_THEME } from '~/lib/constants';
import { cn } from '~/lib/utils';

const CLOSED_INDEX = -1;

type BottomSheetRef = React.ElementRef<typeof BottomSheetModal>;

type BottomSheetProps = Omit<
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>,
  'backdropComponent'
> & {
  backdropProps?: Partial<
    React.ComponentPropsWithoutRef<typeof BottomSheetBackdrop>
  >;
};

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      enablePanDownToClose = true,
      enableDynamicSizing = true,
      index = 0,
      backdropProps,
      backgroundStyle,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
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
        ref={ref}
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
        {...props}
      />
    );
  }
);

type BottomSheetViewProps = React.ComponentPropsWithoutRef<
  typeof GBottomSheetView
>;

function BottomSheetView({
  className,
  children,
  insetBottom,
  ...props
}: BottomSheetViewProps & { insetBottom?: number }) {
  const insets = useSafeAreaInsets();

  return (
    <GBottomSheetView className={cn(`p-4`, className)} {...props}>
      {children}
      <View style={{ height: insetBottom ?? insets.bottom }} />
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
      {...props}
    />
  );
});

function useBottomSheet() {
  const ref = React.useRef<BottomSheetRef>(null);

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
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetTextInput,
  useBottomSheet,
};
