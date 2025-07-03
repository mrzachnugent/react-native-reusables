import { Button } from '@deprecated/components/ui/button';
import { Icon } from '@deprecated/components/ui/icon';
import { ChevronRight } from 'lucide-react-native';

export function ButtonIconPreview() {
  return (
    <Button variant='outline' size='icon'>
      <Icon as={ChevronRight} />
    </Button>
  );
}
