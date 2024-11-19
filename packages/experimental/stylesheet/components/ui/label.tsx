import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const Label = React.forwardRef<LabelPrimitive.TextRef, LabelPrimitive.TextProps>(
  ({ style, onPress, onLongPress, onPressIn, onPressOut, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    return (
      <LabelPrimitive.Root
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <LabelPrimitive.Text ref={ref} style={cs(styles.text, style)} {...props} />
      </LabelPrimitive.Root>
    );
  }
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    text: {
      color: colors.foreground,
      fontSize: utils.fontSize('base'),
      fontWeight: utils.fontWeight('medium'),
    },
  };
});
