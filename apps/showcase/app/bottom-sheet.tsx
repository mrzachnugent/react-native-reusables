import { DeprecatedUi } from '@rnr/reusables';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
} = DeprecatedUi;

// TODO: refactor to use UI bottom-sheet component
export default function BottomSheetScreen() {
  const nameInputRef = React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);
  const usernameInputRef = React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);

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
            <Text>{Platform.OS === 'web' ? 'Not implemented for web yet' : 'Open'}</Text>
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
                  nativeID='name'
                  className={'pb-2.5'}
                  onPress={handleOnLabelPress(nameInputRef)}
                >
                  Name
                </Label>
                <BottomSheetTextInput
                  defaultValue='Pedro Duarte'
                  ref={nameInputRef}
                  aria-labelledby='name'
                />
              </View>
              <View>
                <Label
                  nativeID='username'
                  className={'pb-2.5'}
                  onPress={handleOnLabelPress(usernameInputRef)}
                >
                  Username
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
