import * as React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { Label } from '~/components/old-ui/label';
import { Switch } from '~/components/old-ui/switch';

export default function SwitchScreen() {
  const [value, setValue] = React.useState(false);
  return (
    <>
      <View className='p-6 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
      <View className='flex-1 items-center justify-center p-6'>
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
    </>
  );
}
