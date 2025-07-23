import { Input } from '@/registry/new-york/components/ui/input';

export function InputPreview() {
  return (
    <Input
      keyboardType="email-address"
      textContentType="emailAddress"
      autoComplete="email"
      placeholder="Email"
    />
  );
}
