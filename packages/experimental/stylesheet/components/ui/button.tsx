import * as React from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableStateCallbackType,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { TextStyleContext } from '~/components/ui/text';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';
import { cfs } from '~/lib/styles/utils/combine';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  variant?: Variant;
  size?: Size;
};

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    { style, variant, size, onPressIn: onPressInProp, onPressOut: onPressOutProp, ...props },
    ref
  ) => {
    const { styles } = useStyleSheet(stylesheet);
    const [active, setActive] = React.useState(false);

    function onPressIn(ev: GestureResponderEvent) {
      setActive(true);
      onPressInProp?.(ev);
    }

    function onPressOut(ev: GestureResponderEvent) {
      setActive(false);
      onPressOutProp?.(ev);
    }

    return (
      <TextStyleContext.Provider value={styles.text({ variant, size, active })}>
        <Pressable
          style={cfs(styles.button({ variant, size, disabled: props.disabled }), style)}
          ref={ref}
          role='button'
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          {...props}
        />
      </TextStyleContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

type ButtonStyleSheetArgs = {
  variant?: Variant;
  size?: Size;
  disabled?: boolean | null;
};

type TextVariantArgs = {
  variant?: Variant;
  size?: Size;
  active?: boolean;
};

const stylesheet = createStyleSheet(({ colors }, { space, rounded, fontSize }) => {
  return {
    button: ({ variant = 'default', size = 'default', disabled = false }: ButtonStyleSheetArgs) => {
      return (ev: PressableStateCallbackType) => {
        const style: ViewStyle = {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: rounded['md'],
        };
        if (ev.pressed) {
          style.opacity = 0.9;
        }
        if (disabled) {
          style.opacity = 0.5;
        }
        switch (variant) {
          case 'default':
            style.backgroundColor = colors.primary;
            break;
          case 'destructive':
            style.backgroundColor = colors.destructive;
            break;
          case 'outline':
            style.borderWidth = 1;
            style.borderColor = colors.input;
            style.backgroundColor = colors.background;
            if (ev.pressed) {
              style.backgroundColor = colors.accent;
            }
            break;
          case 'secondary':
            style.backgroundColor = colors.secondary;
            if (ev.pressed) {
              style.opacity = 0.8;
            }
            break;
          case 'ghost':
            if (ev.pressed) {
              style.backgroundColor = colors.accent;
            }
            break;
          case 'link':
            break;
          default:
            break;
        }
        switch (size) {
          case 'default':
            style.height = space[12];
            style.paddingHorizontal = space[5];
            style.paddingVertical = space[3];
            break;
          case 'sm':
            style.height = space[9];
            style.paddingHorizontal = space[3];
            break;
          case 'lg':
            style.height = space[14];
            style.paddingHorizontal = space[8];
            break;
          case 'icon':
            style.height = space[10];
            style.width = space[10];
            break;
          default:
            break;
        }
        return style;
      };
    },
    text: ({ variant = 'default', size = 'default', active = false }: TextVariantArgs) => {
      const style: TextStyle = {
        color: colors.foreground,
        fontSize: size === 'lg' ? fontSize['lg'] : fontSize['base'],
      };
      switch (variant) {
        case 'default':
          style.color = colors.primaryForeground;
          break;
        case 'destructive':
          style.color = colors.destructiveForeground;
          break;
        case 'outline':
          if (active) {
            style.color = colors.accentForeground;
          }
          break;
        case 'secondary':
          style.color = colors.secondaryForeground;
          break;
        case 'ghost':
          if (active) {
            style.color = colors.accentForeground;
          }
          break;
        case 'link':
          style.color = colors.primary;
          if (active) {
            style.textDecorationLine = 'underline';
          }
          break;
        default:
          break;
      }
      return style;
    },
  };
});
