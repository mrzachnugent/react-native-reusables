import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps } from '@rn-primitives/types';
import { View, type ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';
import { TextStyleContext } from './text';

type Variant = 'default' | 'secondary' | 'destructive' | 'outline';

type BadgeProps = SlottableViewProps & { variant?: Variant };

function Badge({ style, variant, asChild, ...props }: BadgeProps) {
  const { styles } = useStyles(stylesheet);
  const Component = asChild ? Slot.View : View;
  return (
    <TextStyleContext.Provider value={styles.text(variant)}>
      <Component style={cs(styles.root(variant), style)} {...props} />
    </TextStyleContext.Provider>
  );
}

export { Badge };
export type { BadgeProps };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    text: (variant: Variant = 'default') => {
      switch (variant) {
        case 'secondary':
          return {
            color: colors.secondaryForeground,
          };
        case 'destructive':
          return {
            color: colors.destructiveForeground,
          };
        case 'outline':
          return {
            color: colors.foreground,
          };
        default:
          return {
            color: colors.primaryForeground,
          };
      }
    },

    root: (variant: Variant = 'default') => {
      const style: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: utils.rounded('full'),
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: utils.space(2.5),
        paddingVertical: utils.space(0.5),
      };

      switch (variant) {
        case 'secondary':
          style.backgroundColor = colors.secondary;
          break;
        case 'destructive':
          style.backgroundColor = colors.destructive;
          break;
        case 'outline':
          style.borderColor = colors.border;
          break;
        default:
          style.backgroundColor = colors.primary;
          break;
      }

      return style;
    },
  };
});
