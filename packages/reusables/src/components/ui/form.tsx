// This project uses code from shadcn/ui.
// The code is licensed under the MIT License.
// https://github.com/shadcn-ui/ui

import * as React from 'react';
import {
  type Control,
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type Noop,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { type TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '../../components/deprecated-ui/bottom-sheet';
import { Calendar } from '../../components/deprecated-ui/calendar';
import { Combobox, type ComboboxOption } from '../../components/deprecated-ui/combobox';
import { Button, buttonTextVariants } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup } from '../../components/ui/radio-group';
import { type Option, Select } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Calendar as CalendarIcon } from '../../lib/icons/Calendar';
import { X } from '../../lib/icons/X';
import { cn } from '../../lib/utils';
import { Text } from './text';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

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
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
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
    ...fieldState,
  };
};

type FormItemContextValue = {
  nativeID: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ ref, className, ...props }: React.CustomComponentPropsWithRef<typeof View>) {
  const nativeID = React.useId();

  return (
    <FormItemContext.Provider value={{ nativeID }}>
      <View ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}
FormItem.displayName = 'FormItem';

function FormLabel({
  ref,
  className,
  nativeID: _nativeID,
  ...props
}: React.CustomComponentPropsWithRef<typeof Label>) {
  const { error, formItemNativeID } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn('pb-1 native:pb-2 px-px', error && 'text-destructive', className)}
      nativeID={formItemNativeID}
      {...props}
    />
  );
}
FormLabel.displayName = 'FormLabel';

function FormDescription({
  ref,
  className,
  ...props
}: React.CustomComponentPropsWithRef<typeof Text>) {
  const { formDescriptionNativeID } = useFormField();

  return (
    <Text
      ref={ref}
      nativeID={formDescriptionNativeID}
      className={cn('text-sm text-muted-foreground pt-1', className)}
      {...props}
    />
  );
}
FormDescription.displayName = 'FormDescription';

function FormMessage({
  ref,
  className,
  children,
  ...props
}: React.CustomComponentPropsWithRef<typeof Animated.Text>) {
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
      nativeID={formMessageNativeID}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </Animated.Text>
  );
}
FormMessage.displayName = 'FormMessage';

type Override<T, U> = Omit<T, keyof U> & U;

interface FormFieldFieldProps<T> {
  name: string;
  onBlur: Noop;
  onChange: (val: T) => void;
  value: T;
  disabled?: boolean;
}

type FormItemProps<T extends React.ComponentType<any>, U> = Override<
  React.CustomComponentPropsWithRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string;
  description?: string;
};

function FormInput({
  ref,
  label,
  description,
  onChange,
  ...props
}: FormItemProps<typeof Input, string>) {
  const inputRef = React.useRef<TextInput>(null);
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  React.useImperativeHandle(
    ref,
    () => {
      if (!inputRef.current) {
        return {} as React.ComponentRef<typeof Input>;
      }
      return inputRef.current;
    },
    []
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
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormInput.displayName = 'FormInput';

function FormTextarea({
  ref,
  label,
  description,
  onChange,
  ...props
}: FormItemProps<typeof Textarea, string>) {
  const textareaRef = React.useRef<TextInput>(null);
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  React.useImperativeHandle(
    ref,
    () => {
      if (!textareaRef.current) {
        return {} as React.ComponentRef<typeof Textarea>;
      }
      return textareaRef.current;
    },
    []
  );

  function handleOnLabelPress() {
    if (!textareaRef.current) {
      return;
    }
    if (textareaRef.current.isFocused()) {
      textareaRef.current?.blur();
    } else {
      textareaRef.current?.focus();
    }
  }

  return (
    <FormItem>
      {!!label && (
        <FormLabel nativeID={formItemNativeID} onPress={handleOnLabelPress}>
          {label}
        </FormLabel>
      )}

      <Textarea
        ref={textareaRef}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onChangeText={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormTextarea.displayName = 'FormTextarea';

function FormCheckbox({
  ref,
  label,
  description,
  value,
  onChange,
  ...props
}: Omit<FormItemProps<typeof Checkbox, boolean>, 'checked' | 'onCheckedChange'>) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className='px-1'>
      <View className='flex-row gap-3 items-center'>
        <Checkbox
          ref={ref}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onCheckedChange={onChange}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel className='pb-0' nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormCheckbox.displayName = 'FormCheckbox';

function FormDatePicker({
  ref,
  label,
  description,
  value,
  onChange,
  ...props
}: FormItemProps<typeof Calendar, string> & React.RefAttributes<View>) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button
            variant='outline'
            className='flex-row gap-3 justify-start px-3 relative'
            ref={ref}
            aria-labelledby={formItemNativeID}
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
                    className: cn(!value && 'opacity-80', pressed && 'opacity-60'),
                  })}
                  size={18}
                />
                <Text
                  className={buttonTextVariants({
                    variant: 'outline',
                    className: cn('font-normal', !value && 'opacity-70', pressed && 'opacity-50'),
                  })}
                >
                  {value ? value : 'Pick a date'}
                </Text>
                {!!value && (
                  <Button
                    className='absolute right-0 active:opacity-70 native:pr-3'
                    variant='ghost'
                    onPress={() => {
                      onChange?.('');
                    }}
                  >
                    <X size={18} className='text-muted-foreground text-xs' />
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
              {...props}
              current={value} // opens calendar on selected date
            />
            <View className={'pb-2 pt-4'}>
              <BottomSheetCloseTrigger asChild>
                <Button>
                  <Text>Close</Text>
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
}

FormDatePicker.displayName = 'FormDatePicker';

type FormRadioGroupProps = Omit<FormItemProps<typeof RadioGroup, string>, 'onValueChange'>;

function FormRadioGroup({
  ref,
  label,
  description,
  value,
  onChange,
  ...props
}: FormRadioGroupProps) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem className='gap-3'>
      <View>
        {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
        {!!description && <FormDescription className='pt-0'>{description}</FormDescription>}
      </View>
      <RadioGroup
        ref={ref}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        onValueChange={onChange}
        value={value}
        {...props}
      />

      <FormMessage />
    </FormItem>
  );
}

FormRadioGroup.displayName = 'FormRadioGroup';

// commented out until Combobox is implemented
type FormComboboxProps = FormItemProps<typeof Combobox, ComboboxOption | null> &
  React.RefAttributes<View>;

function FormCombobox({ ref, label, description, value, onChange, ...props }: FormComboboxProps) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <Combobox
        ref={ref}
        placeholder='Select framework'
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        selectedItem={value}
        onSelectedItemChange={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormCombobox.displayName = 'FormCombobox';

/**
 * @prop {children} 
 * @example
 *  <SelectTrigger className='w-[250px]'>
      <SelectValue
        className='text-foreground text-sm native:text-lg'
        placeholder='Select a fruit'
      />
    </SelectTrigger>
    <SelectContent insets={contentInsets} className='w-[250px]'>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem label='Apple' value='apple'>
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
 */
function FormSelect({
  ref,
  label,
  description,
  onChange,
  value,
  ...props
}: Omit<FormItemProps<typeof Select, Partial<Option>>, 'open' | 'onOpenChange' | 'onValueChange'>) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <Select
        ref={ref}
        aria-labelledby={formItemNativeID}
        aria-describedby={
          !error
            ? `${formDescriptionNativeID}`
            : `${formDescriptionNativeID} ${formMessageNativeID}`
        }
        aria-invalid={!!error}
        value={value ? { label: value?.label ?? '', value: value?.label ?? '' } : undefined}
        onValueChange={onChange}
        {...props}
      />
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormSelect.displayName = 'FormSelect';

function FormSwitch({
  ref,
  label,
  description,
  value,
  onChange,
  ...props
}: Omit<FormItemProps<typeof Switch, boolean>, 'checked' | 'onCheckedChange'>) {
  const switchRef = React.useRef<React.ComponentRef<typeof Switch>>(null);
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  React.useImperativeHandle(
    ref,
    () => {
      if (!switchRef.current) {
        return {} as React.ComponentRef<typeof Switch>;
      }
      return switchRef.current;
    },
    []
  );

  function handleOnLabelPress() {
    onChange?.(!value);
  }

  return (
    <FormItem className='px-1'>
      <View className='flex-row gap-3 items-center'>
        <Switch
          ref={switchRef}
          aria-labelledby={formItemNativeID}
          aria-describedby={
            !error
              ? `${formDescriptionNativeID}`
              : `${formDescriptionNativeID} ${formMessageNativeID}`
          }
          aria-invalid={!!error}
          onCheckedChange={onChange}
          checked={value}
          {...props}
        />
        {!!label && (
          <FormLabel className='pb-0' nativeID={formItemNativeID} onPress={handleOnLabelPress}>
            {label}
          </FormLabel>
        )}
      </View>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormSwitch.displayName = 'FormSwitch';

type FormMultiCheckboxProps<T extends FieldValues = FieldValues> = Omit<
  FormItemProps<typeof Checkbox, string[]>,
  'checked' | 'onCheckedChange' | 'ref' | 'onBlur' | 'onChange' | 'value'
> & {
  items: {
    label: string;
    id: string;
  }[];
  control: Control<T, FieldPath<T>>;
};

// bonus component: FormMultiCheckbox
// implemented following shadcn/ui Checkbox form code example
// https://ui.shadcn.com/docs/components/checkbox#form
function FormMultiCheckbox<T extends FieldValues = FieldValues>({
  label,
  description,
  items,
  control,
  name,
  ...props
}: FormMultiCheckboxProps<T>) {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();

  return (
    <FormItem className='px-1'>
      <View className='flex-col items-start'>
        {!!label && (
          <FormLabel className='pb-0' nativeID={formItemNativeID}>
            {label}
          </FormLabel>
        )}
        {!!description && <FormDescription className='pt-0 pb-4'>{description}</FormDescription>}
        {items.map((item) => (
          <FormField
            key={item.id}
            control={control}
            name={name as FieldPath<T>}
            render={({ field: {value: fieldValue = [] as string[], ...field} }) => (
              <FormItem className='flex-row gap-2 items-start' key={item.id}>
                <Checkbox
                  aria-labelledby={formItemNativeID}
                  aria-describedby={
                    !error
                      ? `${formDescriptionNativeID}`
                      : `${formDescriptionNativeID} ${formMessageNativeID}`
                  }
                  aria-invalid={!!error}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...fieldValue, item.id])
                      : field.onChange(fieldValue.filter((v: string) => v !== item.id));
                  }}
                  checked={fieldValue.includes(item.id)}
                  {...props}
                />
                {!!item.label && (
                  <FormLabel
                    className='pb-0'
                    nativeID={formItemNativeID}
                    onPress={() => {
                      if (fieldValue.includes(item.id)) {
                        field.onChange?.(fieldValue.filter((v: string) => v !== item.id));
                      } else {
                        field.onChange?.([...fieldValue, item.id]);
                      }
                    }}
                  >
                    {item.label}
                  </FormLabel>
                )}
              </FormItem>
            )}
          />
        ))}
      </View>
      <FormMessage />
    </FormItem>
  );
}
FormMultiCheckbox.displayName = 'FormMultiCheckbox';

export {
  Form,
  FormCheckbox,
  FormMultiCheckbox,
  FormCombobox,
  FormDatePicker,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
  useFormField,
};
