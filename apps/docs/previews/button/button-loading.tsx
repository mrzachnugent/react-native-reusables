import { Button } from '@rnr/components/ui/button';
import { Text } from '@rnr/components/ui/text';
import { Loader2 } from '@rnr/lib/icons/Loader2';
import { View } from '@docs/components/react-native';

export function ButtonLoadingPreview() {
  return (
    <Button disabled>
      <View className='animate-spin pointer-events-none'>
        <Loader2 className='text-primary-foreground' />
      </View>
      <Text>Please wait</Text>
    </Button>
  );
}
