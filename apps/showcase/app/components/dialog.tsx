import { ScrollView } from 'react-native';
import { DialogPreview } from '@showcase/components/styles/examples';

export default function DialogScreen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6">
      <DialogPreview />
    </ScrollView>
  );
}
