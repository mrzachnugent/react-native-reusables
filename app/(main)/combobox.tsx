import { View } from 'react-native';
import { Combobox } from '~/components/ui/combobox';

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
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Combobox
        placeholder='Select framework'
        items={frameworks}
        inputProps={{ placeholder: 'Search a framework...' }}
      />
    </View>
  );
}
