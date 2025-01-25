import { View } from '@/components/react-native';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export function DialogPreview() {
  return (
    <Dialog className='not-prose'>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Text>Edit Profile</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className='web:sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {"Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <View className='gap-4 py-4'>
          <View className='flex-row items-center gap-4'>
            <div style={{ width: 96 }} className='w-24 flex justify-end'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
            </div>
            <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
          </View>
          <View className='flex-row items-center gap-4'>
            <div style={{ width: 96 }} className='w-24 flex justify-end'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
            </div>
            <Input id='username' defaultValue='@peduarte' className='col-span-3' />
          </View>
        </View>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>Save Changes</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
