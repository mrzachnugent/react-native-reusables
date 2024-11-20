import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
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

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  ContextMenuPrimitive.SubTriggerRef,
  ContextMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ style, inset = false, children, ...props }, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const { open } = ContextMenuPrimitive.useSubContext();

  const subTriggerStyle = withPressableState(styles.subTrigger, { open, inset });

  const Icon = open ? ChevronUp : ChevronDown;
  return (
    <TextStyleContext.Provider value={styles.subTriggerText(open)}>
      <ContextMenuPrimitive.SubTrigger ref={ref} style={cfs(subTriggerStyle, style)} {...props}>
        <>{children}</>
        <Icon size={18} color={theme.colors.foreground} style={ML_AUTO_STYLE} />
      </ContextMenuPrimitive.SubTrigger>
    </TextStyleContext.Provider>
  );
});
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  ContextMenuPrimitive.SubContentRef,
  ContextMenuPrimitive.SubContentProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ContextMenuPrimitive.SubContent ref={ref} style={cfs(styles.subContent, style)} {...props} />
  );
});
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  ContextMenuPrimitive.ContentRef,
  ContextMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    portalHost?: string;
  }
>(({ style, overlayStyle, portalHost, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ContextMenuPrimitive.Portal hostName={portalHost}>
      <ContextMenuPrimitive.Overlay style={cs(StyleSheet.absoluteFill as ViewStyle, overlayStyle)}>
        <ContextMenuPrimitive.Content
          ref={ref}
          style={style ? StyleSheet.flatten([styles.content, style]) : styles.content}
          {...props}
        />
      </ContextMenuPrimitive.Overlay>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  ContextMenuPrimitive.ItemRef,
  ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ style, inset = false, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  const itemStyle = withPressableState(styles.item, { inset, disabled: props.disabled });
  return (
    <TextStyleContext.Provider value={styles.itemText}>
      <ContextMenuPrimitive.Item ref={ref} style={cfs(itemStyle, style)} {...props} />
    </TextStyleContext.Provider>
  );
});
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  ContextMenuPrimitive.CheckboxItemRef,
  ContextMenuPrimitive.CheckboxItemProps
>(({ style, children, ...props }, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const checkboxItemStyle = withPressableState(styles.checkboxItem, props.disabled);
  return (
    <ContextMenuPrimitive.CheckboxItem ref={ref} style={cfs(checkboxItemStyle, style)} {...props}>
      <ContextMenuPrimitive.ItemIndicator style={styles.indicator}>
        <Check size={14} strokeWidth={3} color={theme.colors.foreground} />
      </ContextMenuPrimitive.ItemIndicator>
      <>{children}</>
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  ContextMenuPrimitive.RadioItemRef,
  ContextMenuPrimitive.RadioItemProps
>(({ style, children, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);

  const radioItemStyle = withPressableState(styles.radioItem, props.disabled);

  return (
    <ContextMenuPrimitive.RadioItem ref={ref} style={cfs(radioItemStyle, style)} {...props}>
      <ContextMenuPrimitive.ItemIndicator style={styles.indicator}>
        <View style={styles.radioItemIndicator} />
      </ContextMenuPrimitive.ItemIndicator>
      <>{children}</>
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  ContextMenuPrimitive.LabelRef,
  ContextMenuPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ style, inset = false, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return <ContextMenuPrimitive.Label ref={ref} style={cs(styles.label(inset), style)} {...props} />;
});
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  ContextMenuPrimitive.SeparatorRef,
  ContextMenuPrimitive.SeparatorProps
>(({ style, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ContextMenuPrimitive.Separator ref={ref} style={cs(styles.separator, style)} {...props} />
  );
});
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ style, ...props }: TextProps) => {
  const { styles } = useStyles(stylesheet);
  return <Text style={cs(styles.shortcut, style)} {...props} />;
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
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
