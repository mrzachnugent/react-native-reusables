import * as React from 'react';
import {
  type GestureResponderEvent,
  type PressableStateCallbackType,
  type TextStyle,
  type ViewStyle,
  Pressable,
} from 'react-native';
import { TextStyleContext } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cfs } from '~/styles/utils/combine';

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
    const [active, setActive] = React.useState(false);
    const { styles } = useStyles(stylesheet);

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
          style={cfs(
            styles.button({
              variant,
              size,
              disabled: props.disabled,
            }),
            style
          )}
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

export { Button, stylesheet as buttonStyleSheet };

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

const stylesheet = createStyleSheet(({ colors, utils }) => {
  const baseButtonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: utils.rounded('md'),
  };

  function getButtonVariantStyle(variant: string, state: PressableStateCallbackType): ViewStyle {
    switch (variant) {
      case 'default':
        return { backgroundColor: colors.primary };
      case 'destructive':
        return { backgroundColor: colors.destructive };
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: colors.input,
          backgroundColor: state.pressed ? colors.accent : colors.background,
        };
      case 'secondary':
        return { backgroundColor: colors.secondary, opacity: state.pressed ? 0.8 : 1 };
      case 'ghost':
        return state.pressed ? { backgroundColor: colors.accent } : {};
      default:
        return {};
    }
  }

  function getButtonSizeStyle(size: string): ViewStyle {
    switch (size) {
      case 'default':
        return {
          height: utils.space(12),
          paddingHorizontal: utils.space(5),
          paddingVertical: utils.space(3),
        };
      case 'sm':
        return {
          height: utils.space(9),
          paddingHorizontal: utils.space(3),
        };
      case 'lg':
        return {
          height: utils.space(14),
          paddingHorizontal: utils.space(8),
        };
      case 'icon':
        return {
          height: utils.space(10),
          width: utils.space(10),
        };
      default:
        return {};
    }
  }

  function button({
    variant = 'default',
    size = 'default',
    disabled = false,
  }: ButtonStyleSheetArgs = {}) {
    const sizeStyle = getButtonSizeStyle(size);

    return (state: PressableStateCallbackType) => {
      const variantStyle = getButtonVariantStyle(variant, state);
      return {
        ...baseButtonStyle,
        ...variantStyle,
        ...sizeStyle,
        opacity: disabled ? 0.5 : state.pressed ? 0.9 : 1,
      };
    };
  }

  function getTextVariantStyle(variant: string, active: boolean): TextStyle {
    switch (variant) {
      case 'default':
        return { color: colors.primaryForeground };
      case 'destructive':
        return { color: colors.destructiveForeground };
      case 'outline':
        return active ? { color: colors.accentForeground } : {};
      case 'secondary':
        return { color: colors.secondaryForeground };
      case 'ghost':
        return active ? { color: colors.accentForeground } : {};
      case 'link':
        return {
          color: colors.primary,
          textDecorationLine: active ? 'underline' : undefined,
        };
      default:
        return {};
    }
  }

  function baseTextStyle(size: string): TextStyle {
    return {
      color: colors.foreground,
      fontSize: size === 'lg' ? utils.fontSize('lg') : utils.fontSize('base'),
    };
  }

  function text({ variant = 'default', size = 'default', active = false }: TextVariantArgs = {}) {
    return {
      ...baseTextStyle(size),
      ...getTextVariantStyle(variant, active),
    };
  }

  return { button, text };
});
