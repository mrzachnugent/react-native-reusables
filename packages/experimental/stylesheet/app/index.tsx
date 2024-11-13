import { Info } from 'lucide-react-native';
import * as React from 'react';
import { Platform, type PressableStateCallbackType, View, type ViewStyle } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';
import { fontWeight } from '~/lib/styles/utils/font-weight';
import { shadow } from '~/lib/styles/utils/shadow';
import { withOpacity } from '~/lib/styles/utils/with-opacity';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const { styles, theme } = useStyleSheet(stylesheet);
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          <Avatar alt="Rick Sanchez's Avatar" style={styles.avatar}>
            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View />
          <CardTitle style={styles.cardTitle}>Rick Sanchez</CardTitle>
          <View style={styles.flexRow}>
            <CardDescription style={styles.cardDescription}>Scientist</CardDescription>
            <Tooltip delayDuration={150}>
              <TooltipTrigger style={styles.tooltipTrigger}>
                <Info
                  size={14}
                  strokeWidth={2.5}
                  color={withOpacity(theme.colors.foreground, 0.7)}
                />
              </TooltipTrigger>
              <TooltipContent style={styles.tooltipContent}>
                <Text>Freelance</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.cardContent}>
            <View style={styles.cardContentItem}>
              <Text style={styles.cardContentKey}>Dimension</Text>
              <Text style={styles.cardContentValue}>C-137</Text>
            </View>
            <View style={styles.cardContentItem}>
              <Text style={styles.cardContentKey}>Age</Text>
              <Text style={styles.cardContentValue}>70</Text>
            </View>
            <View style={styles.cardContentItem}>
              <Text style={styles.cardContentKey}>Species</Text>
              <Text style={styles.cardContentValue}>Human</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter style={styles.cardFooter}>
          <View style={styles.cardFooterContent}>
            <Text style={styles.cardContentKey}>Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                style={styles.counterWrapper}
              >
                <Text style={styles.progressText}>{progress}%</Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View>
          <Progress
            value={progress}
            style={styles.progress}
            indicatorStyle={styles.progressIndicator}
          />
          <View />
          <Button variant='outline' onPress={updateProgressValue}>
            <Text>Update</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors }, { space, fontSize, rounded }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: space[5],
      padding: space[6],
      backgroundColor: withOpacity(colors.secondary, 0.3),
    },
    card: {
      width: '100%',
      maxWidth: 384 * (14 / 16), // Create utility for this?
      ...shadow['2xl'],
      shadowColor: withOpacity('black', 0.3),
      paddingVertical: space[4],
      borderRadius: rounded['xl'],
    },
    cardHeader: {
      alignItems: 'center',
    },
    avatar: {
      width: space[24],
      height: space[24],
    },
    cardTitle: {
      paddingBottom: space[2],
      textAlign: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
    cardDescription: {
      fontWeight: fontWeight['semiBold'],
    },
    tooltipTrigger: (ev: PressableStateCallbackType) => ({
      paddingHorizontal: space[2],
      paddingBottom: space[0.5],
      opacity: ev.pressed ? 0.5 : 1,
    }),
    tooltipContent: {
      paddingVertical: space[2],
      paddingHorizontal: space[4],
      ...Platform.select({
        ios: shadow['base'] as ViewStyle,
        android: {},
      }),
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: space[3],
    },
    cardContentItem: {
      alignItems: 'center',
    },
    cardContentKey: {
      fontSize: fontSize['sm'],
      color: colors.mutedForeground,
    },
    cardContentValue: {
      fontSize: fontSize['xl'],
      fontWeight: fontWeight['semiBold'],
    },
    cardFooter: {
      flexDirection: 'column',
      gap: space[3],
      alignItems: 'center',
    },
    cardFooterContent: {
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    counterWrapper: {
      width: space[11],
      alignItems: 'center',
    },
    progressText: {
      fontSize: fontSize['sm'],
      color: 'dodgerblue',
      fontWeight: fontWeight['bold'],
    },
    progress: {
      height: space[2],
    },
    progressIndicator: {
      backgroundColor: 'dodgerblue',
    },
  };
});
