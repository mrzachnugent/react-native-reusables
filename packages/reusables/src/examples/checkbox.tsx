import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { View } from 'react-native';

export function CheckboxPreview() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className='flex-row gap-3 items-center'>
      <Checkbox aria-labelledby='terms' checked={checked} onCheckedChange={setChecked} />
      <Label nativeID='terms' htmlFor='terms'>
        Accept terms and conditions
      </Label>
    </View>
  );
}
