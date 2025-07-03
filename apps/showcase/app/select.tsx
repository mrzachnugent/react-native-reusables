import { Text } from '@/registry/new-york/components/ui/text';
import { ScrollableSelectPreview, SelectPreview } from '@/registry/new-york/examples/select';
import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SelectScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className='flex-1 justify-center gap-12 items-center p-6'
      style={{ paddingBottom: insets.bottom + 24 }}
    >
      <SelectPreview />
      <View>
        <ScrollableSelectPreview />
        <Text className='text-center text-xs text-muted-foreground pt-2'>With scroll view</Text>
      </View>
    </View>
  );
}
