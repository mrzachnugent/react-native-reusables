import { View } from 'react-native';
import { DatePicker } from '~/components/ui/date-picker';

export default function DatePickerScreen() {
  return (
    <View className='flex-1 justify-center p-6'>
      <DatePicker />
    </View>
  );
}
