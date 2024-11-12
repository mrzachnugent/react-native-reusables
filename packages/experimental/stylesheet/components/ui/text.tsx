import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { cs } from '~/lib/styles/utils/combine';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';

const TextClassContext = React.createContext<StyleProp<TextStyle> | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);
    const textStyle = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.text, textStyle, style)} ref={ref} {...props} />;
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };

const stylesheet = createStyleSheet(({ colors }, { fontSize }) => {
  return {
    text: {
      color: colors.foreground,
      fontSize: fontSize['base'],
    },
  };
});
