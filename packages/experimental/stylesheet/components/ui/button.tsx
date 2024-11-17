import * as React from 'react';
import {
  type GestureResponderEvent,
  type PressableStateCallbackType,
  type TextStyle,
  type ViewStyle,
  Pressable,
} from 'react-native';
import { TextStyleContext } from '~/components/ui/text';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';
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

const stylesheet = createStyleSheet(({ colors }, { space, rounded, fontSize }) => {
  const baseButtonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rounded['md'],
  };

  function getButtonVariantStyle(variant: string, ev: PressableStateCallbackType): ViewStyle {
    switch (variant) {
      case 'default':
        return { backgroundColor: colors.primary };
      case 'destructive':
        return { backgroundColor: colors.destructive };
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: colors.input,
          backgroundColor: ev.pressed ? colors.accent : colors.background,
        };
      case 'secondary':
        return { backgroundColor: colors.secondary, opacity: ev.pressed ? 0.8 : 1 };
      case 'ghost':
        return ev.pressed ? { backgroundColor: colors.accent } : {};
      default:
        return {};
    }
  }

  function getButtonSizeStyle(size: string): ViewStyle {
    switch (size) {
      case 'default':
        return {
          height: space[12],
          paddingHorizontal: space[5],
          paddingVertical: space[3],
        };
      case 'sm':
        return {
          height: space[9],
          paddingHorizontal: space[3],
        };
      case 'lg':
        return {
          height: space[14],
          paddingHorizontal: space[8],
        };
      case 'icon':
        return {
          height: space[10],
          width: space[10],
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
    return (ev: PressableStateCallbackType): ViewStyle => {
      const variantStyle = getButtonVariantStyle(variant, ev);
      const sizeStyle = getButtonSizeStyle(size);

      return {
        ...baseButtonStyle,
        ...variantStyle,
        ...sizeStyle,
        opacity: disabled ? 0.5 : ev.pressed ? 0.9 : 1,
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
      fontSize: size === 'lg' ? fontSize['lg'] : fontSize['base'],
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
