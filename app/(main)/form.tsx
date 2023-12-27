import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormCheckbox,
  FormDatePicker,
  FormField,
  FormInput,
} from '~/components/ui/form';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  dob: z
    .string()
    .min(1, { message: 'Please enter your date of birth' })
    .refine(
      (dob) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        return new Date(today).getTime() !== new Date(dob).getTime();
      },
      {
        message: 'You cannot be born today.',
      }
    ),
  tos: z.boolean().refine((value) => value, {
    message: 'You must accept the terms & conditions',
  }),
});

export default function FormScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      tos: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    Alert.alert('Submitted!', JSON.stringify(values, null, 2));
    form.reset();
  }

  return (
    <ScrollView contentContainerClassName='flex-1 justify-center p-6'>
      <Form {...form}>
        <View className='gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormInput
                label='Email'
                placeholder='hello@zachnugent.ca'
                description='This will not be shared.'
                autoCapitalize='none'
                autoComplete='email'
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
            name='dob'
            render={({ field }) => (
              <FormDatePicker
                label='Date of birth'
                maxDate={new Date().toDateString()}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='tos'
            render={({ field }) => (
              <FormCheckbox label='Accept terms & conditions' {...field} />
            )}
          />
          <View />
          <Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
          <Button
            variant='ghost'
            size='sm'
            onPress={() => {
              form.clearErrors();
            }}
          >
            Clear errors
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}
