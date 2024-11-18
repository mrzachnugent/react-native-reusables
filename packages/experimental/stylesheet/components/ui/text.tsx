import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, type StyleProp, type TextStyle } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const TextStyleContext = React.createContext<StyleProp<TextStyle> | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const textStyle = React.useContext(TextStyleContext);
    const Component = asChild ? Slot.Text : RNText;
    return <Component style={cs(styles.text, textStyle, style)} ref={ref} {...props} />;
  }
);
Text.displayName = 'Text';

export { Text, TextStyleContext };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    text: {
      color: colors.foreground,
      fontSize: utils.fontSize['base'],
    },
  };
});
