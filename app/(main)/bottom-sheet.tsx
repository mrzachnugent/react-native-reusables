import React from 'react';
import { Platform, Text, View } from 'react-native';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
} from '~/components/ui/bottom-sheet';
import {
  Button,
  buttonTextVariants,
  buttonVariants,
} from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

export default function BottomSheetScreen() {
  const nameInputRef =
    React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);
  const usernameInputRef =
    React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);

  function handleOnLabelPress(ref: typeof nameInputRef) {
    return () => {
      if (!ref.current) return;
      const input = ref.current;
      if (input && 'focus' in input && typeof input.focus === 'function') {
        input.focus();
      }
    };
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button>
            {Platform.OS === 'web' ? 'Not implemented for web yet' : 'Open'}
          </Button>
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <Text className='text-foreground text-xl font-bold text-center pb-1'>
              Edit your profile
            </Text>
          </BottomSheetHeader>
          <BottomSheetView className='gap-5 pt-6'>
            <View className='pb-2 gap-6'>
              <View>
                <Label
                  className={'pb-2.5'}
                  onPress={handleOnLabelPress(nameInputRef)}
                >
                  Name
                </Label>
                <BottomSheetTextInput
                  defaultValue='Pedro Duarte'
                  ref={nameInputRef}
                />
              </View>
              <View>
                <Label
                  className={'pb-2.5'}
                  onPress={handleOnLabelPress(usernameInputRef)}
                >
                  Username
                </Label>
                <BottomSheetTextInput
                  defaultValue='@peduarte'
                  ref={usernameInputRef}
                />
              </View>
            </View>
            <View className={cn(Platform.OS === 'android' && 'pb-2')}>
              <BottomSheetCloseTrigger
                className={buttonVariants({ size: 'sm' })}
              >
                <Text className={buttonTextVariants()}>Save Changes</Text>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}
