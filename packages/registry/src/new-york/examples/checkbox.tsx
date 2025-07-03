import { Checkbox } from '@/registry/new-york/components/ui/checkbox';
import { Label } from '@/registry/new-york/components/ui/label';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Text } from '@/registry/new-york/components/ui/text';
import { cn } from '@/registry/new-york/lib/utils';

export function CheckboxPreview() {
  const [state, setState] = React.useState({
    termsChecked: true,
    terms2Checked: true,
    toggleChecked: false,
    toggle2Checked: false,
  });

  function toggleCheckedState(key: keyof typeof state) {
    return () => {
      setState((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
  }

  return (
    <View className='flex flex-col gap-6'>
      <View className='flex flex-row items-center gap-3'>
        <Checkbox
          id='terms'
          checked={state.termsChecked}
          onCheckedChange={toggleCheckedState('termsChecked')}
        />
        <Label
          onPress={Platform.select({ native: toggleCheckedState('termsChecked') })}
          htmlFor='terms'
        >
          Accept terms and conditions
        </Label>
      </View>
      <View className='flex flex-row items-start gap-3 '>
        <Checkbox
          id='terms-2'
          checked={state.terms2Checked}
          onCheckedChange={toggleCheckedState('terms2Checked')}
        />
        <View className='gap-2 flex-1'>
          <Label
            onPress={Platform.select({ native: toggleCheckedState('terms2Checked') })}
            htmlFor='terms-2'
          >
            Accept terms and conditions
          </Label>
          <Text className='text-muted-foreground text-sm'>
            By clicking this checkbox, you agree to the terms and conditions.
          </Text>
        </View>
      </View>
      <View className='flex flex-row items-start gap-3'>
        <Checkbox
          id='toggle'
          disabled
          checked={state.toggleChecked}
          onCheckedChange={toggleCheckedState('toggleChecked')}
        />
        <Label
          onPress={Platform.select({ native: toggleCheckedState('toggleChecked') })}
          htmlFor='toggle'
          disabled
        >
          Enable notifications
        </Label>
      </View>
      <Label
        onPress={Platform.select({ native: toggleCheckedState('toggle2Checked') })}
        htmlFor='toggle-2'
        className={cn(
          'flex flex-row web:hover:bg-accent/50 rounded-lg border border-border p-3',
          state.toggle2Checked && 'border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'
        )}
      >
        <View className='flex flex-row items-start gap-3'>
          <Checkbox
            id='toggle-2'
            checked={state.toggle2Checked}
            onCheckedChange={toggleCheckedState('toggle2Checked')}
            checkedClassName='border-blue-600 bg-blue-600 dark:border-blue-700'
            indicatorClassName='bg-blue-600 text-white dark:bg-blue-700 dark:text-white'
          />
          <View className='flex-1'>
            <Text className='text-sm leading-none font-medium'>Enable notifications</Text>
            <Text className='text-muted-foreground text-sm'>
              You can enable or disable notifications at any time.
            </Text>
          </View>
        </View>
      </Label>
    </View>
  );
}
