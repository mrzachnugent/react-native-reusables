import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import Drawer from 'expo-router/drawer';
import { Check, Copy } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as RNRDialog,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { RenderTabsViewProps, Tabs, TabsView } from '~/components/ui/tabs';
import * as Dialog from '~/lib/rn-primitives/dialog';
import { cn } from '~/lib/utils';

const DATA = ['RN Reusable', 'Primitive'];

export default function DialogScreen() {
  const [wasCopied, setWasCopied] = React.useState(false);

  const renderTabs = React.useCallback((props: RenderTabsViewProps) => {
    switch (props.item) {
      case 'RN Reusable':
        return (
          <TabsView {...props}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ height: 77 }} className='w-full opacity-0' />
              <RNRDialog>
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
              </RNRDialog>
              <View className='p-4 w-full'>
                <Alert icon='Code' className='max-w-xl'>
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    This reusable does not use "primitives".
                  </AlertDescription>
                </Alert>
              </View>
            </ScrollView>
          </TabsView>
        );
      case 'Primitive':
        return (
          <TabsView {...props}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Dialog.Root>
                <Dialog.Trigger>
                  <Text className='text-foreground text-xl'>Open dialog</Text>
                </Dialog.Trigger>
                <Dialog.Portal className='flex-1 justify-center items-center'>
                  <Dialog.Overlay
                    style={StyleSheet.absoluteFill}
                    className='bg-zinc-50/80 dark:bg-zinc-900/80 justify-center items-center'
                  >
                    <Dialog.Content className='bg-background'>
                      <Dialog.Title className='text-foreground text-xl'>
                        TITLE
                      </Dialog.Title>
                      <Dialog.Description className='text-foreground text-xl'>
                        DESCRIPTION
                      </Dialog.Description>
                      <Dialog.Close>
                        <Text className='text-foreground text-xl'>Close</Text>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>
            </ScrollView>
          </TabsView>
        );
      default:
        return null;
    }
  }, []);

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
    <>
      <Drawer.Screen
        options={{ headerStyle: { shadowColor: 'transparent' } }}
      />
      <Tabs tabs={DATA} renderTabs={renderTabs} initialIndex={0} />
    </>
  );
}
