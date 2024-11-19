import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';

export default function BadgeScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Badge>
        <Text>Default</Text>
      </Badge>
      <Badge variant={'secondary'}>
        <Text>Secondary</Text>
      </Badge>
      <Badge variant={'destructive'}>
        <Text>Destructive</Text>
      </Badge>
      <Badge variant={'outline'}>
        <Text>Outline</Text>
      </Badge>
    </View>
  );
}

const stylesheet = createStyleSheet(({ utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: utils.space(5),
    },
  };
});
