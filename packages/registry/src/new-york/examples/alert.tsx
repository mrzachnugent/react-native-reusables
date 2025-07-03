import { Alert, AlertDescription, AlertTitle } from '@/new-york/components/ui/alert';
import { Text } from '@/new-york/components/ui/text';
import { AlertCircleIcon, CheckCircle2Icon, Terminal } from 'lucide-react-native';
import { View } from 'react-native';

export function AlertPreview() {
  return (
    <View className='max-w-xl gap-4 w-full'>
      <Alert icon={CheckCircle2Icon}>
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
      </Alert>
      <Alert icon={Terminal}>
        <AlertTitle>This Alert has no description.</AlertTitle>
      </Alert>
      <Alert variant='destructive' icon={AlertCircleIcon}>
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>Please verify your billing information and try again.</AlertDescription>
        <View role='list' className='pl-6 ml-0.5 pb-2'>
          <Text role='listitem'>
            <Text className='web:pr-2'>•</Text> Check your card details
          </Text>
          <Text role='listitem'>
            <Text className='web:pr-2'>•</Text> Ensure sufficient funds
          </Text>
          <Text role='listitem'>
            <Text className='web:pr-2'>•</Text> Verify billing address
          </Text>
        </View>
      </Alert>
    </View>
  );
}
