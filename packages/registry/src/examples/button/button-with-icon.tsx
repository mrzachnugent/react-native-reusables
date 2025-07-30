'use client';

import { Button } from '@/registry/ui/button';
import { Icon } from '@/registry/ui/icon';
import { Text } from '@/registry/ui/text';
import { Mail } from 'lucide-react-native';

export function ButtonWithIconPreview() {
  return (
    <Button>
      <Icon as={Mail} className="text-primary-foreground" />
      <Text>Login with Email</Text>
    </Button>
  );
}
