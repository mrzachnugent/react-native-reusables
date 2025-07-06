import { Button, Text } from '@showcase/components/styles/ui';
import { useStyle } from '@showcase/components/styles/style-provider';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const { style, setStyle } = useStyle();

  return (
    <View className='flex-1 items-center p-6'>
      <Text>Style: {style}</Text>
      <Button
        onPress={() => {
          hapticStyleChange();
          setStyle(style === 'default' ? 'new-york' : 'default');
        }}
      >
        <Text>Toggle Style</Text>
      </Button>
    </View>
  );
}

async function hapticStyleChange() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}
