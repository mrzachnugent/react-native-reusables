import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from '@/lib/icons/Terminal';

export function AlertPreview() {
  return (
    <Alert icon={Terminal} className='max-w-xl'>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can use a terminal to run commands on your computer.</AlertDescription>
    </Alert>
  );
}
