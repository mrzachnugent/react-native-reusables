import { View } from '@docs/components/react-native';
import { Checkbox } from '@rnr/components/ui/checkbox';
import { Label } from '@rnr/components/ui/label';

export function CheckboxPreview() {
  return (
    <View className='flex-row gap-3 items-center'>
      {/* TODO */}
      <Checkbox aria-labelledby='terms' />
      <Label nativeID='terms' htmlFor='terms'>
        Accept terms and conditions
      </Label>
    </View>
  );
}
