import { View } from '@/components/react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

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
