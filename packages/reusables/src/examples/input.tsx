import { Input } from '@deprecated/components/ui/input';

export function InputPreview() {
  return (
    <Input
      keyboardType='email-address'
      textContentType='emailAddress'
      autoComplete='email'
      placeholder='Email'
    />
  );
}
