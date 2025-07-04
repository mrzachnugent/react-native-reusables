'use client';

import { Button } from '@/registry/default/components/ui/button';
import { Icon } from '@/registry/default/components/ui/icon';
import { Text } from '@/registry/default/components/ui/text';
import { Mail } from 'lucide-react-native';

export function ButtonWithIconPreview() {
  return (
    <Button>
      <Icon as={Mail} className='text-primary-foreground' />
      <Text>Login with Email</Text>
    </Button>
  );
}
