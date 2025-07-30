'use client';

import { Button } from '@/registry/ui/button';
import { Icon } from '@/registry/ui/icon';
import { ChevronRight } from 'lucide-react-native';

export function ButtonIconPreview() {
  return (
    <Button variant="outline" size="icon">
      <Icon as={ChevronRight} />
    </Button>
  );
}
