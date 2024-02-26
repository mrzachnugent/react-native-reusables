import { DeprecatedUi } from '@rnr/reusables';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

const { Calendar, LocaleConfig } = DeprecatedUi;

// TODO: refactor to use UI components

LocaleConfig.defaultLocale = 'en';

export default function CalendarScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 16, gap: 32 }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: isDarkColorScheme ? '#0ea5e9' : '#0284c7',
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
    </ScrollView>
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
