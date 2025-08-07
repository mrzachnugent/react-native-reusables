import { CardPreview } from '@/registry/examples/card';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';

export default function CardScreen() {
  return (
    <KeyboardGestureArea interpolator="ios" style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1 justify-center items-center p-6"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled">
        <CardPreview />
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
}
