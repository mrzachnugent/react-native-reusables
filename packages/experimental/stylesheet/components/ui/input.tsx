import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
  ({ style, placeholderTextColor, ...props }, ref) => {
    const { styles, theme } = useStyles(stylesheet);
    return (
      <TextInput
        ref={ref}
        style={cs(styles.root, props.editable === false && styles.disabled, style)}
        placeholderTextColor={placeholderTextColor ?? theme.colors.mutedForeground}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

const stylesheet = createStyleSheet(({ utils, colors }) => {
  return {
    root: {
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.input,
      backgroundColor: colors.background,
      padding: utils.space(3),
      fontSize: utils.mediaMinWidth('lg') ? utils.fontSize('sm') : utils.fontSize('lg'),
      color: colors.foreground,
    },
    disabled: {
      opacity: 0.5,
    },
  };
});
