import { Button } from '@/registry/ui/button';
import { Icon } from '@/registry/ui/icon';
import { Text } from '@/registry/ui/text';
import { Loader2 } from 'lucide-react-native';
import { View } from 'react-native';

export function ButtonLoadingPreview() {
  return (
    <Button disabled>
      <View className="pointer-events-none animate-spin">
        <Icon as={Loader2} className="text-primary-foreground" />
      </View>
      <Text>Please wait</Text>
    </Button>
  );
}
