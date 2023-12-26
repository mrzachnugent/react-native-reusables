import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Check, Copy } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
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
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';

export default function DialogScreen() {
  const [wasCopied, setWasCopied] = React.useState(false);

  async function copyLink() {
    await Promise.all([
      Clipboard.setStringAsync('https://github.com/mrzachnugent'),
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    ]);
    setWasCopied(true);

    setTimeout(() => {
      setWasCopied(false);
    }, 1000);
  }
  return (
    <View className='flex-1 justify-center items-center'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Share</Button>
        </DialogTrigger>
        <DialogContent className='gap-5'>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex-col items-start gap-5'>
            <View className='flex-row gap-3'>
              <Input
                className='flex-1'
                autoFocus
                defaultValue='https://github.com/mrzachnugent'
                selectTextOnFocus
              />
              <Button size='sm' className='px-4' onPress={copyLink}>
                {({ pressed }) =>
                  wasCopied ? (
                    <Check
                      size={21}
                      className={cn(
                        'text-primary-foreground',
                        pressed && 'opacity-70'
                      )}
                    />
                  ) : (
                    <Copy
                      size={21}
                      className={cn(
                        'text-primary-foreground',
                        pressed && 'opacity-70'
                      )}
                    />
                  )
                }
              </Button>
            </View>
            <DialogClose asChild>
              <Button variant='secondary'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
