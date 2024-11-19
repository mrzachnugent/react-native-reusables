import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';

export default function CheckboxScreen() {
  const { styles } = useStyles(stylesheet);
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <Checkbox aria-labelledby='terms' checked={checked} onCheckedChange={setChecked} />
        <Label nativeID='terms' onPress={() => setChecked((prev) => !prev)}>
          Accept terms and conditions
        </Label>
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
      gap: utils.space(12),
      padding: utils.space(6),
    },
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: utils.space(3),
    },
  };
});
