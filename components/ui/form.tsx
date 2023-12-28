// This project uses code from shadcn/ui.
// The code is licensed under the MIT License.
// https://github.com/shadcn-ui/ui

import { CalendarIcon, X } from 'lucide-react-native';
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '~/components/ui/bottom-sheet';
import { Button, buttonTextVariants } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { Checkbox } from './checkbox';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState, handleSubmit } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { nativeID } = itemContext;

  return {
    nativeID,
    name: fieldContext.name,
    formItemNativeID: `${nativeID}-form-item`,
    formDescriptionNativeID: `${nativeID}-form-item-description`,
    formMessageNativeID: `${nativeID}-form-item-message`,
    handleSubmit,
    ...fieldState,
  };
};

type FormItemContextValue = {
  nativeID: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const nativeID = React.useId();

  return (
    <FormItemContext.Provider value={{ nativeID }}>
      <View ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemNativeID } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      nativeID={formItemNativeID}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { formDescriptionNativeID } = useFormField();

  return (
    <Text
      ref={ref}
      id={formDescriptionNativeID}
      className={cn('text-sm text-muted-foreground pt-1', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Animated.Text>,
  React.ComponentPropsWithoutRef<typeof Animated.Text>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageNativeID } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      ref={ref}
      id={formMessageNativeID}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </Animated.Text>
  );
});
FormMessage.displayName = 'FormMessage';

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    label?: string;
    description?: string;
  }
>(({ label, description, onChange, ...props }, ref) => {
  const inputRef = React.useRef<React.ComponentRef<typeof Input>>(null);
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  React.useImperativeHandle(
    ref,
    () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
    },
    [inputRef.current]
  );

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Input
        ref={inputRef}
        aria-labelledbyledBy={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange as ((text: string) => void) | undefined}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormInput.displayName = 'FormInput';

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentPropsWithoutRef<typeof Checkbox> & {
    label?: string;
    description?: string;
  }
>(({ label, description, value, onChange, ...props }, ref) => {
  const checkboxRef = React.useRef<React.ComponentRef<typeof Checkbox>>(null);
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  React.useImperativeHandle(
    ref,
    () => {
      if (!checkboxRef.current) {
        return {} as React.ComponentRef<typeof Checkbox>;
      }
      return checkboxRef.current;
    },
    [checkboxRef.current]
  );

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className='px-1'>
      <View className='flex-row gap-3 items-center bg-background'>
        <Checkbox
          ref={checkboxRef}
          aria-labelledbyledBy={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onChange={onChange}
          value={value}
          {...props}
        />
        {!!label && (
          <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

const FormDatePicker = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Calendar>, 'onChange'> & {
    label?: string;
    description?: string;
    value?: string;
    onChange?: ((text: string) => void) | undefined;
  }
>(({ label, description, value, onChange, ...props }, ref) => {
  const {
    error,
    formItemNativeID,
    formDescriptionNativeID,
    formMessageNativeID,
  } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button
            variant='outline'
            className='gap-3 justify-start px-4 relative'
            ref={ref}
            aria-labelledbyledBy={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-invalid={!!error}
          >
            {({ pressed }) => (
              <>
                <CalendarIcon
                  className={buttonTextVariants({
                    variant: 'outline',
                    className: cn(
                      !value && 'opacity-80',
                      pressed && 'opacity-50'
                    ),
                  })}
                  size={21}
                />
                <Text
                  className={buttonTextVariants({
                    variant: 'outline',
                    className: cn(
                      !value && 'opacity-80',
                      pressed && 'opacity-50'
                    ),
                  })}
                >
                  {value ? value : 'Pick a date'}
                </Text>
                {!!value && (
                  <Button
                    className='absolute right-0 px-3'
                    variant='ghost'
                    onPress={() => {
                      onChange?.('');
                    }}
                  >
                    {({ pressed }) => (
                      <X
                        className={cn(
                          'text-muted-foreground',
                          pressed && 'opacity-70'
                        )}
                      />
                    )}
                  </Button>
                )}
              </>
            )}
          </Button>
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetView hadHeader={false} className='pt-2'>
            <Calendar
              style={{ height: 358 }}
              onDayPress={(day) => {
                onChange?.(day.dateString === value ? '' : day.dateString);
              }}
              markedDates={{
                [value ?? '']: {
                  selected: true,
                },
              }}
              current={value} // opens calendar on selected date
              {...props}
            />
            <View className={'pb-2 pt-4'}>
              <BottomSheetCloseTrigger asChild>
                <Button size='sm'>
                  {({ pressed }) => (
                    <Text
                      className={buttonTextVariants({
                        className: cn(pressed && 'opacity-70'),
                      })}
                    >
                      Close
                    </Text>
                  )}
                </Button>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

// TODO: add Form components for:
// Radio Group
// Select
// Switch
// Textarea
// Combobox

export {
  Form,
  FormCheckbox,
  FormDatePicker,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
