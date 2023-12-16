import { View } from 'react-native';
import { Calendar } from '~/components/ui/calendar';

export default function CalendarScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Calendar />
    </View>
  );
}
