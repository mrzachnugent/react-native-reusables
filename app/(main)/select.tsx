import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Select } from '~/components/ui/select';

const { height } = Dimensions.get('window');
export default function SelectScreen() {
  return (
    <ScrollView>
      <View style={{ height: height / 3 }} />
      <View className=' justify-center p-6'>
        <Select />
      </View>
      <View style={{ height: height }} />
    </ScrollView>
  );
}
