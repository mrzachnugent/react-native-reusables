import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Mail } from '@/lib/icons/Mail';

export function ButtonWithIconPreview() {
  return (
    <Button>
      <Mail className='text-primary-foreground' />
      <Text>Login with Email</Text>
    </Button>
  );
}
