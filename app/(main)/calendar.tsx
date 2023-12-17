import React from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from '~/components/ui/calendar';

LocaleConfig.defaultLocale = 'en';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);

  return (
    <View className='flex-1 py-4 gap-8'>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
      />
      <Calendar
        onDayPress={(day) => {
          setSelectedDates((prev) => {
            if (prev.includes(day.dateString)) {
              return prev.filter((date) => date !== day.dateString);
            }
            return [...prev, day.dateString];
          });
        }}
        markedDates={getMarkedDates(selectedDates)}
        theme={{
          todayTextColor: 'orange',
          arrowColor: 'orange',
        }}
      />
    </View>
  );
}

function getMarkedDates(dates: string[]) {
  return dates.reduce((acc, date) => {
    acc[date] = {
      selected: true,
      selectedColor: 'orange',
    };
    return acc;
  }, {} as Record<string, { selected: boolean; selectedColor: string }>);
}
