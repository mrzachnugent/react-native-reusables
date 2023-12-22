import React from 'react';
import { View } from 'react-native';
import {
  Select,
  SelectItem,
  SelectList,
  SelectTrigger,
  type RenderSelectItem,
  type SelectData,
} from '~/components/ui/select';

const DATA = [
  { value: 'tom@cruise.com', label: 'tom@cruise.com' },
  { value: 'napoleon@dynamite.com', label: 'napoleon@dynamite.com' },
  { value: 'kunfu@panda.com', label: 'kunfu@panda.com' },
  { value: 'bruce@lee.com', label: 'bruce@lee.com' },
  { value: 'harry@potter.com', label: 'harry@potter.com' },
  { value: 'jane@doe.com', label: 'jane@doe.com' },
  { value: 'elon@musk.com', label: 'elon@musk.com' },
  { value: 'lara@croft.com', label: 'lara@croft.com' },
];

export default function SelectScreen() {
  const renderItem: RenderSelectItem = React.useCallback(
    ({ item, index }) => <SelectItem item={item} index={index} />,
    []
  );

  function onValueChange(value: SelectData | null) {
    if (!value) return;
    console.log(`Selected ${value.label}`);
  }
  return (
    <View className='flex-1 justify-center p-6'>
      <Select items={DATA} onValueChange={onValueChange}>
        <SelectTrigger placeholder='Select a verified email' />
        <SelectList renderItem={renderItem} />
      </Select>
    </View>
  );
}
