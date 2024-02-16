import * as React from 'react';
import { View } from 'react-native';
import { Label, LabelText } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

export default function SwitchScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <View className='flex-row items-center gap-2'>
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            nativeID='airplane-mode'
          />
          <Label
            onPress={() => {
              setChecked((prev) => !prev);
            }}
          >
            <LabelText nativeID='airplane-mode'>Airplane Mode</LabelText>
          </Label>
        </View>
      </View>
    </>
  );
}
