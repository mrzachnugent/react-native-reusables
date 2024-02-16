import * as React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { Checkbox } from '~/components/old-ui/checkbox';
import { Label } from '~/components/old-ui/label';

export default function CheckboxScreen() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <View className='flex-row gap-6 items-center'>
        <Label
          onPress={() => {
            setIsChecked((prev) => !prev);
          }}
          nativeID='checkLabel'
          className='pt-2 native:text-xl'
        >
          Accept terms & conditions
        </Label>
        <Checkbox
          aria-labelledby='checkLabel'
          value={isChecked}
          onChange={setIsChecked}
        />
      </View>
      <View className='py-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </View>
  );
}
