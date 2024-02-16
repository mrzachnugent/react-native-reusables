import { View } from 'react-native';
import { ContextMenu } from '~/components/old-ui/context-menu';

export default function ContextMenuScreen() {
  return (
    <View className='flex-1 justify-center items-center'>
      <ContextMenu />
    </View>
  );
}
