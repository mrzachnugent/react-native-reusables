import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Loader2 } from '~/lib/icons/Loader2';
import { View } from '@/components/react-native';

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
