import { Checkbox } from '@deprecated/components/ui/checkbox';
import { Label } from '@deprecated/components/ui/label';
import * as React from 'react';
import { Platform, View } from 'react-native';

export function LabelPreview() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-row gap-2 items-center'>
      <Checkbox aria-labelledby='terms' id='terms' checked={checked} onCheckedChange={setChecked} />
      <Label
        nativeID='terms'
        htmlFor='terms'
        onPress={Platform.select({ native: () => setChecked((prev) => !prev) })}
      >
        Accept terms and conditions
      </Label>
    </View>
  );
}
