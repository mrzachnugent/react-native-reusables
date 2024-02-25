import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { CircleUserRound } from '~/components/Icons';
import { cn } from '~/lib/utils';

export function ModalToggle() {
  return (
    <Pressable
      onPress={() => {
        router.push('/modal');
      }}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square justify-center items-end pt-0.5 web:pl-4',
            pressed && 'opacity-70'
          )}
        >
          <CircleUserRound className='text-foreground' size={24} strokeWidth={1.25} />
        </View>
      )}
    </Pressable>
  );
}
