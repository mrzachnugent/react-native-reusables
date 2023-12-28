import React from 'react';
import { TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';

export default function TextareaScreen() {
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
    <View className='flex-1 justify-center p-6'>
      <Label
        className={cn(err && 'text-destructive', 'pb-2.5')}
        onPress={handleOnLabelPress}
        nativeID='textareaLabel'
      >
        Label
      </Label>
      <Textarea
        ref={inputRef}
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        aria-labelledby='textarea'
        aria-labelledbyledBy='textareaLabel'
      />
      {err && (
        <Animated.Text
          entering={FadeInDown}
          exiting={FadeOutUp.duration(275)}
          className={'text-destructive text-sm px-0.5 py-2'}
          role='alert'
        >
          {err}
        </Animated.Text>
      )}
    </View>
  );
}
