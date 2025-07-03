import { Button } from '@/new-york/components/ui/button';
import { Input } from '@/new-york/components/ui/input';
import { Label } from '@/new-york/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/new-york/components/ui/popover';
import { Text } from '@/new-york/components/ui/text';
import { View } from 'react-native';

export function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Text>Open popover</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80' side='top'>
        <View className='gap-4'>
          <View className='gap-2'>
            <Text className='leading-none font-medium'>Dimensions</Text>
            <Text className='text-muted-foreground text-sm'>Set the dimensions for the layer.</Text>
          </View>
          <View className='gap-2'>
            <View className='flex-row items-center gap-4'>
              <Label className='w-24 web:block' htmlFor='width'>
                Width
              </Label>
              <Input id='width' defaultValue='100%' className='flex-1 h-8' />
            </View>
            <View className='flex-row items-center gap-4'>
              <Label className='w-24 web:block' htmlFor='maxWidth'>
                Max. width
              </Label>
              <Input id='maxWidth' defaultValue='300px' className='flex-1 h-8' />
            </View>
            <View className='flex-row items-center gap-4'>
              <Label className='w-24 web:block' htmlFor='height'>
                Height
              </Label>
              <Input id='height' defaultValue='25px' className='flex-1 h-8' />
            </View>
            <View className='flex-row items-center gap-4'>
              <Label className='w-24 web:block' htmlFor='maxHeight'>
                Max. height
              </Label>
              <Input id='maxHeight' defaultValue='none' className='flex-1 h-8' />
            </View>
          </View>
        </View>
      </PopoverContent>
    </Popover>
  );
}
