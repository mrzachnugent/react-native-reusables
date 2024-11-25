import * as React from 'react';
import { ScrollView, TextInput, TextStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

export default function InputScreen() {
  const { styles } = useStyles(stylesheet);
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState('');
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

  function onSubmitEditing() {
    setErr('Write more stuff to remove this error message.');
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelection(0, value.length);
    }, 50);
  }

  return (
    <ScrollView contentContainerStyle={styles.root} keyboardShouldPersistTaps='handled'>
      <Label
        style={cs(styles.label as TextStyle, !!err && styles.destructiveText)}
        nativeID='inputLabel'
        onPress={handleOnLabelPress}
      >
        Label
      </Label>
      <Input
        ref={inputRef}
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
        style={!!err ? styles.borderDestructive : undefined}
      />
      {!!err && <ErrorMessage msg={err} />}
    </ScrollView>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  const { styles } = useStyles(stylesheet);
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut.duration(275)}>
      <Text style={styles.errorMessage} aria-invalid='true' nativeID='inputError'>
        {msg}
      </Text>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      flex: 1,
      padding: utils.space(6),
    },
    label: {
      paddingBottom: utils.space(1),
      paddingLeft: utils.space(0.5),
    },
    destructiveText: {
      color: colors.destructive,
    },
    borderDestructive: {
      borderColor: colors.destructive,
    },
    errorMessage: {
      color: colors.destructive,
      fontSize: utils.fontSize('sm'),
      paddingHorizontal: utils.space(1),
      paddingVertical: utils.space(1.5),
    },
  };
});
