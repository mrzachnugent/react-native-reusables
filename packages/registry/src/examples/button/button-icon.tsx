import { Button } from '@/registry/new-york/components/ui/button';
import { Icon } from '@/registry/new-york/components/ui/icon';
import { ChevronRight } from 'lucide-react-native';

export function ButtonIconPreview() {
  return (
    <Button variant="outline" size="icon">
      <Icon as={ChevronRight} />
    </Button>
  );
}
