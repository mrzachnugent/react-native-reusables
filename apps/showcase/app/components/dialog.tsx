import { ScrollView } from 'react-native';
import { DialogPreview } from '@/registry/examples/dialog';

export default function DialogScreen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6">
      <DialogPreview />
    </ScrollView>
  );
}
