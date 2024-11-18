import { AlertTriangle, Terminal } from 'lucide-react-native';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { getBaseUnitScale } from '~/styles/utils/base-unit';

export default function AlertScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Alert icon={Terminal} style={styles.maxWXL}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use a terminal to run commands on your computer.
        </AlertDescription>
      </Alert>
      <Alert icon={AlertTriangle} variant='destructive' style={styles.maxWXL}>
        <AlertTitle>Danger!</AlertTitle>
        <AlertDescription>
          High voltage. Do not touch. Risk of electric shock. Keep away from children.
        </AlertDescription>
      </Alert>
    </View>
  );
}

const stylesheet = createStyleSheet(({ utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: utils.space[6],
      alignItems: 'center',
      gap: utils.space[6],
    },
    maxWXL: {
      maxWidth: getBaseUnitScale(36),
      width: '100%',
    },
  };
});
