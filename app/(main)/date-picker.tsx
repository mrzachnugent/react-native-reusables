import { CalendarIcon } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
} from '~/components/ui/date-picker';

export default function DatePickerScreen() {
  const [selectedDate, setSelectedDate] = React.useState('');
  return (
    <View className='flex-1 justify-center p-6'>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        className='px-6'
      >
        <DatePickerTrigger
          className={buttonVariants({
            variant: 'outline',
            className: 'gap-3',
          })}
        >
          {({ pressed }) => (
            <>
              <CalendarIcon
                className={buttonTextVariants({
                  variant: 'outline',
                  className: pressed ? 'opacity-70' : '',
                })}
                size={21}
              />
              <Text
                className={buttonTextVariants({
                  variant: 'outline',
                  className: pressed ? 'opacity-70' : '',
                })}
              >
                {selectedDate ? selectedDate : 'Pick a date'}
              </Text>
            </>
          )}
        </DatePickerTrigger>
        <DatePickerContent />
      </DatePicker>
    </View>
  );
}
