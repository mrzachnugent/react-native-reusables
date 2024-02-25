import * as React from 'react';
import { View } from 'react-native';
import { DeprecatedUi } from '@rnr/reusables';

const { Combobox } = DeprecatedUi;

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export default function ComboboxScreen() {
  const [selectedItem, setSelectedItem] = React.useState<DeprecatedUi.ComboboxOption | null>(null);
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Combobox
        selectedItem={selectedItem}
        onSelectedItemChange={setSelectedItem}
        placeholder='Select framework'
        items={frameworks}
      />
    </View>
  );
}
