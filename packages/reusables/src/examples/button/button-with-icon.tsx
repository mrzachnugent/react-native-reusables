import { Button } from '@deprecated/components/ui/button';
import { Icon } from '@deprecated/components/ui/icon';
import { Text } from '@deprecated/components/ui/text';
import { Mail } from 'lucide-react-native';

export function ButtonWithIconPreview() {
  return (
    <Button>
      <Icon as={Mail} className='text-primary-foreground' />
      <Text>Login with Email</Text>
    </Button>
  );
}
