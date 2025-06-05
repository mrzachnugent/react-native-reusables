import { View } from '@docs/components/react-native';
import { Button } from '@rnr/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rnr/components/ui/dialog';
import { Label } from '@rnr/components/ui/label';
import { Input } from '@rnr/components/ui/input';
import { Text } from '@rnr/components/ui/text';

// TODO(zach): check this works on native

export function DialogPreview() {
  return (
    <Dialog>
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
            <Label htmlFor='name' className='w-24 text-right'>
              Name
            </Label>
            <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
          </View>
          <View className='flex-row items-center gap-4'>
            <Label htmlFor='username' className='w-24 text-right'>
              Username
            </Label>
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
