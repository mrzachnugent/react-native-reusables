import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '~/components/universal-ui/button';
import { Text } from '~/components/universal-ui/typography';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/universal-ui/dialog';

export default function DialogUniversalScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <ScrollView contentContainerClassName='flex-1 justify-center items-center p-6'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Text>Edit Profile</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
}
