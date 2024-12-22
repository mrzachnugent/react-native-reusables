import { router } from 'expo-router';
import { ChevronRightIcon } from 'lucide-react-native';
import * as React from 'react';
import { FlatList, Pressable, type PressableStateCallbackType, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { ITEMS } from '~/constants';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { withOpacity } from '~/styles/utils/with-opacity';

export default function Screen() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <FlatList
      data={ITEMS}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={styles.item}
            onPress={() => {
              router.navigate(`/${item}`);
            }}
          >
            <Text style={styles.text}>{item}</Text>
            <ChevronRightIcon color={theme.colors.mutedForeground} />
          </Pressable>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const stylesheet = createStyleSheet(({ colors, utils }, { hairlineWidth, themeName }) => {
  return {
    item: (state: PressableStateCallbackType) => {
      return {
        padding: utils.space(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: state.pressed ? 0.5 : 1,
      };
    },
    text: {
      textTransform: 'capitalize',
      fontSize: utils.fontSize('lg'),
    },
    separator: {
      height: hairlineWidth,
      backgroundColor: withOpacity(colors.mutedForeground, themeName === 'dark' ? 0.25 : 0.55),
    },
  };
});
