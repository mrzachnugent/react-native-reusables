import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Loader2 } from 'lucide-react-native';
import { View } from 'react-native';

export function ButtonLoadingPreview() {
  return (
    <Button disabled>
      <View className='animate-spin pointer-events-none'>
        <Icon as={Loader2} className='text-primary-foreground' />
      </View>
      <Text>Please wait</Text>
    </Button>
  );
}
