import * as React from 'react';
import { Platform, View } from 'react-native';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
} from '~/components/deprecated-ui/bottom-sheet';
import { Button } from '~/components/ui/button';
import { Label, LabelText } from '~/components/ui/label';
import { Text } from '~/components/ui/typography';
import { cn } from '~/lib/utils';

// TODO(v2): refactor to use UI bottom-sheet component
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
            <Text>
              {Platform.OS === 'web' ? 'Not implemented for web yet' : 'Open'}
            </Text>
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
                  <LabelText nativeID='name'>Name</LabelText>
                </Label>
                <BottomSheetTextInput
                  defaultValue='Pedro Duarte'
                  ref={nameInputRef}
                  aria-labelledby='name'
                />
              </View>
              <View>
                <Label
                  className={'pb-2.5'}
                  onPress={handleOnLabelPress(usernameInputRef)}
                >
                  <LabelText nativeID='username'>Username</LabelText>
                </Label>
                <BottomSheetTextInput
                  defaultValue='@peduarte'
                  ref={usernameInputRef}
                  aria-labelledby='username'
                />
              </View>
            </View>
            <View className={cn(Platform.OS === 'android' && 'pb-2')}>
              <BottomSheetCloseTrigger asChild>
                <Button>
                  <Text>Save Changes</Text>
                </Button>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}
