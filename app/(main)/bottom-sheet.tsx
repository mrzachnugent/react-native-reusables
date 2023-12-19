import React from 'react';
import { Text, View } from 'react-native';
import {
  BottomSheet,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
} from '~/components/ui/bottom-sheet';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function BottomSheetScreen() {
  const bottomSheet = useBottomSheet();
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
      <Button
        onPress={() => {
          bottomSheet.open();
        }}
      >
        Open
      </Button>
      <BottomSheet ref={bottomSheet.ref}>
        <BottomSheetView className='gap-5'>
          <View className='pt-2'>
            <Text className='text-foreground text-3xl font-bold text-center pb-1'>
              Edit your profile
            </Text>
            <Text className='text-base text-muted-foreground text-center px-12'>
              Make changes to your profile here. Click save when you're done.
            </Text>
          </View>
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
                autoFocus
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
          <View className='py-4'>
            <Button size='sm'>Save Changes</Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
