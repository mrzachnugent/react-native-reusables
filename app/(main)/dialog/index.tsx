import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Check, Copy } from '~/components/Icons';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { Button } from '~/components/old-ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from '~/components/old-ui/dialog';
import { Input } from '~/components/old-ui/input';
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
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ height: 105 }} className='w-full opacity-0' />
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
      <View className='p-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </ScrollView>
  );
}
