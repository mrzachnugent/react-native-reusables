import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

export default function InputScreen() {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>('');
  const [err, setErr] = React.useState<string | null>(null);

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  function onChangeText(text: string) {
    if (err) {
      setErr(null);
    }
    setValue(text);
  }

  function onBlur() {
    setErr("Seem's like something is not right...");
  }

  return (
    <ScrollView contentContainerClassName='flex-1 justify-center p-6'>
      <Label
        className={cn(err && 'text-destructive', 'pb-2.5')}
        onPress={handleOnLabelPress}
        nativeID='inputLabel'
      >
        Label
      </Label>
      <Input
        ref={inputRef}
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        aria-labelledby='input'
        aria-labelledbyledBy='inputLabel'
      />
      {err && (
        <Animated.Text
          entering={FadeInDown}
          exiting={FadeOut.duration(275)}
          className={'text-destructive text-sm px-0.5 py-2'}
          role='alert'
        >
          {err}
        </Animated.Text>
      )}
      <View className='h-20' />
    </ScrollView>
  );
}
