import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircle } from '~/lib/icons/AlertCircle';

export function AlertDestructive() {
  return (
    <Alert variant='destructive' icon={AlertCircle} className='max-w-xl'>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  );
}
