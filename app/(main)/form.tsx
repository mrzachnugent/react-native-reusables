import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormCheckbox, FormField, FormInput } from '~/components/ui/form';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  tos: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms & conditions' }),
  }),
});

export default function FormScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    Alert.alert('Submitted!', JSON.stringify(values, null, 2));
    form.reset();
  }

  return (
    <View className='flex-1 justify-center p-6'>
      <Form {...form}>
        <View className='gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormInput
                label='Email'
                placeholder='hello@zachnugent.ca'
                autoCapitalize='none'
                autoComplete='email'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormInput
                label='Username'
                placeholder='mrzachnugent'
                description='This is your public display name.'
                autoCapitalize='none'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormInput
                label='Password'
                placeholder='********'
                description='Use a secure password.'
                secureTextEntry
                autoComplete='password'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='tos'
            render={({ field: { value, onChange, ...rest } }) => (
              <FormCheckbox
                label='Accept terms & conditions'
                value={!!value}
                onChange={(value) => onChange(!!value)}
                {...rest}
              />
            )}
          />
          <View />
          <Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
        </View>
      </Form>
    </View>
  );
}
