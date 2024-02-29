import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormCheckbox,
  FormCombobox,
  FormDatePicker,
  FormField,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '~/components/ui/form';
import { Label } from '~/components/ui/label';
import { RadioGroupItem } from '~/components/ui/radio-group';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const emails = [
  { value: 'tom@cruise.com', label: 'tom@cruise.com' },
  { value: 'napoleon@dynamite.com', label: 'napoleon@dynamite.com' },
  { value: 'kunfu@panda.com', label: 'kunfu@panda.com' },
  { value: 'bruce@lee.com', label: 'bruce@lee.com' },
  { value: 'harry@potter.com', label: 'harry@potter.com' },
  { value: 'jane@doe.com', label: 'jane@doe.com' },
  { value: 'elon@musk.com', label: 'elon@musk.com' },
  { value: 'lara@croft.com', label: 'lara@croft.com' },
];

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  about: z.string().min(1, {
    message: 'We need to know.',
  }),
  accountType: z.enum(['staff', 'admin', 'owner']),
  framework: z.object(
    { value: z.string(), label: z.string() },
    {
      invalid_type_error: 'Please select a framework.',
    }
  ),
  favoriteEmail: z.object(
    { value: z.string(), label: z.string() },
    {
      invalid_type_error: 'Please select a favorite email.',
    }
  ),
  enableNotifications: z.boolean(),
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

// TODO: refactor to use UI components

export default function FormScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      about: '',
      enableNotifications: false,
      tos: false,
    },
  });

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    Alert.alert('Submitted!', JSON.stringify(values, null, 2), [
      {
        text: 'OK',
        onPress: () => {
          scrollRef.current?.scrollTo({ y: 0 });
          form.reset();
        },
      },
    ]);
  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerClassName='p-6 mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <Form {...form}>
        <View className='gap-7'>
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
            name='about'
            render={({ field }) => (
              <FormTextarea
                label='Tell me about yourself'
                placeholder='I am ...'
                description='This will be used by AI.'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='accountType'
            defaultValue='staff'
            render={({ field }) => {
              function onLabelPress(label: 'staff' | 'admin' | 'owner') {
                return () => {
                  form.setValue('accountType', label);
                };
              }
              return (
                <FormRadioGroup
                  label='Account Type'
                  description='Select your account type.'
                  className='gap-4'
                  {...field}
                >
                  {(['staff', 'admin', 'owner'] as const).map((value) => {
                    return (
                      <View key={value} className={'flex-row gap-2 items-center'}>
                        <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
                        <Label
                          nativeID={`label-for-${value}`}
                          className='capitalize'
                          onPress={onLabelPress(value)}
                        >
                          {value}
                        </Label>
                      </View>
                    );
                  })}
                </FormRadioGroup>
              );
            }}
          />
          <FormField
            control={form.control}
            name='framework'
            render={({ field }) => (
              <FormCombobox
                label='Favorite Framework'
                description='More important than your skills.'
                items={frameworks}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='favoriteEmail'
            render={({ field }) => (
              <FormSelect
                label='If you were an email, which one would you be?'
                description='Hint: it is not the one you use.'
                {...field}
              >
                <SelectTrigger
                  onLayout={(ev) => {
                    setSelectTriggerWidth(ev.nativeEvent.layout.width);
                  }}
                >
                  <SelectValue
                    className={cn(
                      'text-sm native:text-lg',
                      field.value ? 'text-foreground' : 'text-muted-foreground'
                    )}
                    placeholder='Select a verified email'
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} style={{ width: selectTriggerWidth }}>
                  <SelectGroup>
                    {emails.map((email) => (
                      <SelectItem key={email.value} label={email.label} value={email.value}>
                        <Text>{email.label}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormSelect>
            )}
          />
          <FormField
            control={form.control}
            name='enableNotifications'
            render={({ field }) => (
              <FormSwitch
                label='Enable notifications'
                description='We will send you spam.'
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
            render={({ field }) => <FormCheckbox label='Accept terms & conditions' {...field} />}
          />
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
          <View>
            <Button
              variant='ghost'
              onPress={() => {
                form.clearErrors();
              }}
            >
              <Text>Clear errors</Text>
            </Button>
            <Button
              variant='ghost'
              onPress={() => {
                form.reset();
              }}
            >
              <Text>Clear form values</Text>
            </Button>
          </View>
        </View>
      </Form>
    </ScrollView>
  );
}
