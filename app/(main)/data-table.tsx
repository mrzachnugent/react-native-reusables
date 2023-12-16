import { View } from 'react-native';
import { DataTable } from '~/components/ui/data-table';

export default function DataTableScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <DataTable />
    </View>
  );
}
