import { Info } from '~/components/Icons';
import { Pressable, Text, View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/old-ui/popover';
import { cn } from '~/lib/utils';

export default function TooltipScreen() {
  return (
    <>
      <View className='p-6 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
      <View className='flex-1 justify-center p-6'>
        <View className='flex-row justify-center gap-3'>
          <Text className='text-2xl text-foreground'>Username</Text>
          <Popover>
            <PopoverTrigger asChild>
              <Pressable>
                {({ pressed }) => (
                  <Info
                    className={cn(
                      pressed ? 'opacity-70' : '',
                      'text-foreground'
                    )}
                    size={18}
                  />
                )}
              </Pressable>
            </PopoverTrigger>
            <PopoverContent width={300} align='center'>
              <View className='gap-1.5'>
                <Text className='text-2xl font-bold text-foreground'>
                  Your public name
                </Text>
                <Text className='text-lg text-muted-foreground'>
                  This is the name that will be displayed to other users.
                </Text>
              </View>
            </PopoverContent>
          </Popover>
        </View>
      </View>
    </>
  );
}
