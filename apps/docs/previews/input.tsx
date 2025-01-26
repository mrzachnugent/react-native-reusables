import { Input } from '@/components/reusables';

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
