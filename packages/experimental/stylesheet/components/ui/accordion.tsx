import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';
import { TextStyleContext } from './text';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';
import { cfs, cs } from '~/styles/utils/combine';
import { fontWeight } from '~/styles/utils/font-weight';

const OVERFLOW_HIDDEN_STYLE: ViewStyle = {
  overflow: 'hidden',
};

const CHEVRON_DOWN_STYLE: ViewStyle = {
  flexShrink: 0,
};

const Accordion = React.forwardRef<AccordionPrimitive.RootRef, AccordionPrimitive.RootProps>(
  ({ children, ...props }, ref) => {
    return (
      <LayoutAnimationConfig skipEntering>
        <AccordionPrimitive.Root ref={ref} asChild {...props}>
          <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
        </AccordionPrimitive.Root>
      </LayoutAnimationConfig>
    );
  }
);

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<AccordionPrimitive.ItemRef, AccordionPrimitive.ItemProps>(
  ({ style, value, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);
    return (
      <Animated.View style={OVERFLOW_HIDDEN_STYLE} layout={LinearTransition.duration(200)}>
        <AccordionPrimitive.Item
          ref={ref}
          style={cs(styles.item, style)}
          value={value}
          {...props}
        />
      </Animated.View>
    );
  }
);
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionPrimitive.TriggerProps
>(({ style, children, ...props }, ref) => {
  const { styles, theme } = useStyleSheet(stylesheet);
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <TextStyleContext.Provider value={styles.triggerText}>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger ref={ref} {...props} asChild>
          <Trigger style={cfs(styles.trigger, style)}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <ChevronDown size={18} color={theme.colors.foreground} style={CHEVRON_DOWN_STYLE} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextStyleContext.Provider>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  AccordionPrimitive.ContentRef,
  AccordionPrimitive.ContentProps
>(({ style, children, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <TextStyleContext.Provider value={styles.contentText}>
      <AccordionPrimitive.Content style={OVERFLOW_HIDDEN_STYLE} ref={ref} {...props}>
        <InnerContent style={style}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextStyleContext.Provider>
  );
});

function InnerContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      style={cs(styles.innerContent, style)}
    >
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

const stylesheet = createStyleSheet(({ colors }, { fontSize, space }) => {
  return {
    item: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    triggerText: {
      fontSize: fontSize['lg'],
      fontWeight: fontWeight.medium,
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: space[4],
    },
    contentText: {
      fontSize: fontSize['lg'],
    },
    innerContent: {
      paddingBottom: space[4],
    },
  };
});
