import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react-native';
import * as React from 'react';
import { type TextStyle, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

export default function CollapsibleScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const [open, setOpen] = React.useState(false);
  return (
    <View style={styles.root}>
      <Collapsible asChild open={open} onOpenChange={setOpen}>
        <Animated.View layout={LinearTransition}>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <Text style={cs(styles.text as TextStyle, styles.semibold)}>
                @peduarte starred 3 repositories
              </Text>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='icon'>
                  {open ? (
                    <ChevronsDownUp size={16} color={theme.colors.foreground} />
                  ) : (
                    <ChevronsUpDown size={16} color={theme.colors.foreground} />
                  )}
                </Button>
              </CollapsibleTrigger>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>@rn-primitives/collapsible</Text>
            </View>
            <CollapsibleContent style={styles.gap2}>
              <CollapsibleItem delay={100}>@rn-primitives/slot</CollapsibleItem>
              <CollapsibleItem delay={200}>@rn-primitives/types</CollapsibleItem>
            </CollapsibleContent>
          </View>
        </Animated.View>
      </Collapsible>
    </View>
  );
}

function CollapsibleItem({ children, delay }: { children: string; delay: number }) {
  const { styles } = useStyles(stylesheet);
  return (
    <Animated.View entering={FadeInDown.duration(200).delay(delay)} style={styles.item}>
      <Text style={styles.text}>{children}</Text>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: utils.space(6),
    },
    wrapper: {
      width: '100%',
      maxWidth: 350,
      gap: utils.space(2),
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: utils.space(4),
      gap: utils.space(4),
    },
    text: {
      color: colors.foreground,
      fontSize: utils.fontSize('lg'),
    },
    semibold: {
      fontWeight: utils.fontWeight('semibold'),
    },
    item: {
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: utils.space(3),
      paddingHorizontal: utils.space(4),
    },
    gap2: {
      gap: utils.space(2),
    },
  };
});
