import React from 'react';
import { View } from 'react-native';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

export default function RadioGroupScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <RadioGroup defaultValue='white'>
        <RadioGroupItem name='white'>Mr. White</RadioGroupItem>
        <RadioGroupItem name='blue'>Mr. Blue</RadioGroupItem>
        <RadioGroupItem name='pink'>Mr. Pink</RadioGroupItem>
      </RadioGroup>
    </View>
  );
}
