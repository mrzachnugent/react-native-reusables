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

interface DatePickerProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const DatePickerContext = React.createContext({} as DatePickerProps);

const DatePicker = React.forwardRef<
  React.ElementRef<typeof BottomSheet>,
  React.ComponentPropsWithoutRef<typeof BottomSheet> & DatePickerProps
>(({ selectedDate, setSelectedDate, ...props }, ref) => {
  return (
    <DatePickerContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      <BottomSheet ref={ref} {...props} />
    </DatePickerContext.Provider>
  );
});

DatePicker.displayName = 'DatePicker';

function useDatePickerContext() {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      'DatePicker compound components cannot be rendered outside the DatePicker component'
    );
  }
  return context;
}

const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof BottomSheetOpenTrigger>,
  React.ComponentPropsWithoutRef<typeof BottomSheetOpenTrigger>
>((props, ref) => {
  return <BottomSheetOpenTrigger ref={ref} {...props} />;
});

DatePickerTrigger.displayName = 'DatePickerTrigger';

const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof BottomSheetContent>,
  Omit<React.ComponentPropsWithoutRef<typeof BottomSheetView>, 'children'>
>(({ className, ...props }, ref) => {
  const { selectedDate, setSelectedDate } = useDatePickerContext();
  return (
    <BottomSheetContent ref={ref}>
      <BottomSheetView
        hadHeader={false}
        className={cn('pt-2', className)}
        {...props}
      >
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
        <View className={cn('pb-2 pt-4')}>
          <BottomSheetCloseTrigger className={buttonVariants({ size: 'sm' })}>
            <Text className={buttonTextVariants()}>Close</Text>
          </BottomSheetCloseTrigger>
        </View>
      </BottomSheetView>
    </BottomSheetContent>
  );
});

DatePickerContent.displayName = 'DatePickerContent';

export { DatePicker, DatePickerContent, DatePickerTrigger };
