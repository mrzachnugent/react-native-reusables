import { View } from 'react-native';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { H1 } from '~/components/ui/typography';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';

export default function AspectRatioScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <AspectRatio ratio={16 / 9}>
          <View style={styles.content}>
            <H1 style={styles.text}>16:9</H1>
          </View>
        </AspectRatio>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      width: '50%',
    },
    content: {
      backgroundColor: 'dodgerblue',
      height: '100%',
      width: '100%',
      borderRadius: utils.rounded('lg'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
    },
  };
});
