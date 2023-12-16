import { View } from 'react-native';
import { DatePicker } from '~/components/ui/date-picker';

export default function DatePickerScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <DatePicker />
    </View>
  );
}
