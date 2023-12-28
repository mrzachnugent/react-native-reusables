import React from 'react';
import { View } from 'react-native';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

export default function SwitchScreen() {
  const [value, setValue] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='flex-row items-center gap-5'>
        <Switch
          aria-labelledbyledBy='switchLabel'
          value={value}
          onValueChange={setValue}
        />
        <Label
          onPress={() => {
            setValue((prev) => !prev);
          }}
          nativeID='switchLabel'
          className='text-xl pb-2'
        >
          Airplane mode
        </Label>
      </View>
    </View>
  );
}
