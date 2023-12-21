import { CalendarIcon } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '~/components/ui/bottom-sheet';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { cn } from '~/lib/utils';

export default function DatePickerScreen() {
  const [selectedDate, setSelectedDate] = React.useState('');
  return (
    <View className='flex-1 justify-center items-center'>
      <BottomSheet className='px-6'>
        <BottomSheetOpenTrigger
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
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetView hadHeader={false} className='pt-2'>
            <Calendar
              style={{ height: 358 }}
              onDayPress={(day) => {
                setSelectedDate((prev) =>
                  day.dateString === prev ? '' : day.dateString
                );
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                },
              }}
              current={selectedDate} // opens calendar on selected date
            />
            <View className={'pb-2 pt-4'}>
              <BottomSheetCloseTrigger
                className={buttonVariants({ size: 'sm' })}
              >
                {({ pressed }) => (
                  <Text
                    className={buttonTextVariants({
                      className: cn(pressed && 'opacity-70'),
                    })}
                  >
                    Close
                  </Text>
                )}
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}
