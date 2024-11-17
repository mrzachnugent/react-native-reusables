import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';
import { FONT_WEIGHT } from '~/styles/utils/font-weight';
import { SHADOW } from '~/styles/utils/shadow';
import { withOpacity } from '~/styles/utils/with-opacity';

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps & {
    icon: LucideIcon;
    iconSize?: number;
    iconColor?: string;
    variant?: 'default' | 'destructive';
  }
>(
  (
    { style, variant = 'default', children, icon: Icon, iconSize = 16, iconColor, ...props },
    ref
  ) => {
    const { styles, theme } = useStyleSheet(stylesheet);
    return (
      <View
        ref={ref}
        role='alert'
        style={cs(styles.root, variant === 'destructive' && styles.borderDestructive, style)}
        {...props}
      >
        <View style={styles.iconContainer}>
          <Icon
            size={iconSize}
            color={
              iconColor ?? variant === 'destructive'
                ? theme.colors.destructive
                : theme.colors.foreground
            }
          />
        </View>
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <Text ref={ref} style={cs(styles.title, style)} {...props} />;
});
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <Text ref={ref} style={cs(styles.description, style)} {...props} />;
});
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };

const stylesheet = createStyleSheet(({ colors }, { space, rounded, tracking, fontSize }) => {
  return {
    root: {
      backgroundColor: colors.background,
      borderRadius: rounded['lg'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: space[4],
      ...SHADOW['lg'],
      shadowColor: withOpacity(colors.foreground, 0.1),
    },
    borderDestructive: {
      borderColor: colors.destructive,
    },
    iconContainer: {
      position: 'absolute',
      left: space[3.5],
      top: space[4],
      transform: [{ translateY: -space[0.5] }],
    },
    title: {
      paddingLeft: space[7],
      marginBottom: space[1],
      fontWeight: FONT_WEIGHT['medium'],
      fontSize: fontSize['base'],
      letterSpacing: tracking['tight'],
      color: colors.foreground,
    },
    description: {
      paddingLeft: space[7],
      fontSize: fontSize['sm'],
      color: colors.foreground,
    },
  };
});
