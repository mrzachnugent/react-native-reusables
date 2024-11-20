import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import {
  PressableStateCallbackType,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cfs, cs } from '~/styles/utils/combine';
import { withPressableState } from '~/styles/utils/with-pressable-state';
import { TextStyleContext } from './text';

const ML_AUTO_STYLE: ViewStyle = {
  marginLeft: 'auto',
};

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuPrimitive.SubTriggerRef,
  DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ style, inset = false, children, ...props }, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const { open } = DropdownMenuPrimitive.useSubContext();

  const subTriggerStyle = withPressableState(styles.subTrigger, { open, inset });
  const Icon = open ? ChevronUp : ChevronDown;
  return (
    <TextStyleContext.Provider value={styles.subTriggerText(open)}>
      <DropdownMenuPrimitive.SubTrigger ref={ref} style={cfs(subTriggerStyle, style)} {...props}>
        <>{children}</>
        <Icon size={18} color={theme.colors.foreground} style={ML_AUTO_STYLE} />
      </DropdownMenuPrimitive.SubTrigger>
    </TextStyleContext.Provider>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuPrimitive.SubContentRef,
  DropdownMenuPrimitive.SubContentProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <DropdownMenuPrimitive.SubContent ref={ref} style={cfs(styles.subContent, style)} {...props} />
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  DropdownMenuPrimitive.ContentRef,
  DropdownMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    portalHost?: string;
  }
>(({ style, overlayStyle, portalHost, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay style={cs(StyleSheet.absoluteFill as ViewStyle, overlayStyle)}>
        <DropdownMenuPrimitive.Content
          ref={ref}
          style={style ? StyleSheet.flatten([styles.content, style]) : styles.content}
          {...props}
        />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  DropdownMenuPrimitive.ItemRef,
  DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ style, inset = false, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  const itemStyle = withPressableState(styles.item, { inset, disabled: props.disabled });
  return (
    <TextStyleContext.Provider value={styles.itemText}>
      <DropdownMenuPrimitive.Item ref={ref} style={cfs(itemStyle, style)} {...props} />
    </TextStyleContext.Provider>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  DropdownMenuPrimitive.CheckboxItemRef,
  DropdownMenuPrimitive.CheckboxItemProps
>(({ style, children, checked, ...props }, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const checkboxItemStyle = withPressableState(styles.checkboxItem, props.disabled);
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      style={cfs(checkboxItemStyle, style)}
      checked={checked}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator style={styles.indicator}>
        <Check size={14} strokeWidth={3} color={theme.colors.foreground} />
      </DropdownMenuPrimitive.ItemIndicator>
      <>{children}</>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  DropdownMenuPrimitive.RadioItemRef,
  DropdownMenuPrimitive.RadioItemProps
>(({ style, children, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);

  const radioItemStyle = withPressableState(styles.radioItem, props.disabled);

  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} style={cfs(radioItemStyle, style)} {...props}>
      <DropdownMenuPrimitive.ItemIndicator style={styles.indicator}>
        <View style={styles.radioItemIndicator} />
      </DropdownMenuPrimitive.ItemIndicator>
      <>{children}</>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  DropdownMenuPrimitive.LabelRef,
  DropdownMenuPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ style, inset = false, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <DropdownMenuPrimitive.Label ref={ref} style={cs(styles.label(inset), style)} {...props} />
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  DropdownMenuPrimitive.SeparatorRef,
  DropdownMenuPrimitive.SeparatorProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <DropdownMenuPrimitive.Separator ref={ref} style={cs(styles.separator, style)} {...props} />
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ style, ...props }: TextProps) => {
  const { styles } = useStyles(stylesheet);
  return <Text style={cs(styles.shortcut, style)} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    subTriggerText: (open: boolean) => {
      return {
        fontSize: utils.fontSize('lg'),
        color: open ? colors.accentForeground : colors.primary,
      };
    },
    subTrigger: (
      state: PressableStateCallbackType,
      { open, inset }: { open: boolean; inset: boolean }
    ) => {
      return {
        flexDirection: 'row',
        alignItems: 'center',
        gap: utils.space(2),
        rounded: 'sm',
        padding: utils.space(2),
        backgroundColor: open || state.pressed ? colors.accent : undefined,
        paddingLeft: inset ? utils.space(8) : undefined,
      };
    },
    subContent: {
      minWidth: utils.rem(8),
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: utils.space(1),
      backgroundColor: colors.popover,
      padding: utils.space(1),
    },
    content: {
      minWidth: utils.rem(8),
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.popover,
      padding: utils.space(1),
      ...utils.shadow('md'),
    },
    itemText: {
      fontSize: utils.fontSize('lg'),
      color: colors.popoverForeground,
    },
    item: (
      state: PressableStateCallbackType,
      { inset, disabled }: { inset: boolean; disabled?: boolean | null }
    ) => {
      return {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: utils.space(2),
        borderRadius: utils.rounded('sm'),
        padding: utils.space(2),
        backgroundColor: state.pressed ? colors.accent : undefined,
        paddingLeft: inset ? utils.space(8) : undefined,
        opacity: disabled ? 0.5 : 1,
      };
    },
    checkboxItem: (state: PressableStateCallbackType, disabled?: boolean | null) => {
      return {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: utils.space(2),
        borderRadius: utils.rounded('sm'),
        padding: utils.space(2),
        paddingLeft: utils.space(8),
        backgroundColor: state.pressed ? colors.accent : undefined,
        opacity: disabled ? 0.5 : 1,
      };
    },
    indicator: {
      position: 'absolute',
      left: utils.space(2),
      alignItems: 'center',
      justifyContent: 'center',
      height: utils.space(3.5),
      width: utils.space(3.5),
    },
    radioItem: (state: PressableStateCallbackType, disabled?: boolean | null) => {
      return {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: utils.rounded('sm'),
        padding: utils.space(2),
        paddingLeft: utils.space(8),
        backgroundColor: state.pressed ? colors.accent : undefined,
        opacity: disabled ? 0.5 : 1,
      };
    },
    radioItemIndicator: {
      backgroundColor: colors.foreground,
      height: utils.space(2),
      width: utils.space(2),
      borderRadius: utils.space(1),
    },
    label: (inset: boolean) => {
      return {
        paddingHorizontal: utils.space(2),
        paddingVertical: utils.space(1.5),
        fontSize: utils.fontSize('base'),
        fontWeight: utils.fontWeight('semibold'),
        color: colors.foreground,
        paddingLeft: inset ? utils.space(8) : undefined,
      };
    },
    separator: {
      marginHorizontal: -utils.space(1),
      marginVertical: utils.space(1),
      height: 1,
      backgroundColor: colors.border,
    },
    shortcut: {
      marginLeft: 'auto',
      fontSize: utils.fontSize('sm'),
      color: colors.mutedForeground,
      letterSpacing: utils.tracking('widest'),
    },
  };
});
