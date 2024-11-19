import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cfs } from '~/styles/utils/combine';

const INDICATOR_STYLE: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
};

const Checkbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxPrimitive.RootProps>(
  ({ style, ...props }, ref) => {
    const { styles, theme } = useStyles(stylesheet);
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        style={cfs(styles.root(props.checked, props.disabled), style)}
        {...props}
      >
        <CheckboxPrimitive.Indicator style={INDICATOR_STYLE}>
          <Check size={12} strokeWidth={3.5} color={theme.colors.primaryForeground} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: (checked: boolean, disabled: boolean | undefined) => ({
      height: utils.space(5),
      width: utils.space(5),
      flexShrink: 0,
      borderRadius: utils.rounded('base'),
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: checked ? colors.primary : 'transparent',
      opacity: disabled ? 0.5 : 1,
    }),
  };
});
