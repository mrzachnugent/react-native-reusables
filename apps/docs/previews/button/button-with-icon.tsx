import { Button } from '@rnr/components/ui/button';
import { Text } from '@rnr/components/ui/text';
import { Mail } from '@rnr/lib/icons/Mail';

export function ButtonWithIconPreview() {
  return (
    <Button>
      <Mail className='text-primary-foreground' />
      <Text>Login with Email</Text>
    </Button>
  );
}
