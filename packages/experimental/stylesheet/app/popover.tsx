import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';

// TODO(zach): Check up on issue https://github.com/react-navigation/react-navigation/issues/12294

export default function PopoverScreen() {
  const { styles } = useStyles(stylesheet);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View style={styles.root}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <Text>Open popover</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent side='top' insets={contentInsets} style={styles.content}>
          <Text>Popover content</Text>
        </PopoverContent>
      </Popover>
    </View>
  );
}

const stylesheet = createStyleSheet(({ utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: utils.space(6),
    },
    content: {
      width: utils.space(80),
      height: utils.space(44),
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
