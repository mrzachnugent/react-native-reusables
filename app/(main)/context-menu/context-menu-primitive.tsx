import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ContextMenu from '~/lib/rn-primitives/context-menu';
import { PortalHost } from '~/lib/rn-primitives/portal';

export default function ContextPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  insets.right = 22;
  insets.left = 22;
  const headerHeight = useHeaderHeight();
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('1');
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [subRadioValue, setSubRadioValue] = React.useState('1');

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <ContextMenu.Root open={open} onOpenChange={setOpen} className='w-full'>
          <ContextMenu.Trigger className='p-8 border border-dashed rounded-xl border-sky-500 bg-sky-100/20'>
            <Text className='text-foreground text-xl text-center'>
              Root Portal ContextMenu
            </Text>
            <Text className='text-foreground font-bold text-center'>
              LONG PRESS WITHIN DASHED BORDER
            </Text>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Overlay className='bg-sky-500/10' />
            <ContextMenu.Content
              align='start'
              insets={insets}
              className='bg-background w-36'
            >
              <ContextMenu.Group>
                <ContextMenu.Label className='text-foreground font-bold'>
                  Label
                </ContextMenu.Label>
                <ContextMenu.Item>
                  <Text className='text-foreground text-xl'>Item 1</Text>
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <Text className='text-foreground text-xl'>Item 2</Text>
                </ContextMenu.Item>
              </ContextMenu.Group>
              <ContextMenu.Separator />
              <ContextMenu.CheckboxItem
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
                closeOnPress={false}
                className='flex-row justify-between items-center gap-3'
              >
                <Text className='text-foreground text-xl'>Is checked?</Text>
                <ContextMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
              </ContextMenu.CheckboxItem>
              <ContextMenu.RadioGroup
                value={radioValue}
                onValueChange={setRadioValue}
              >
                <ContextMenu.RadioItem
                  className='flex-row justify-between items-center gap-3'
                  value='1'
                  closeOnPress={false}
                >
                  <Text className='text-foreground text-xl'>Radio 1</Text>
                  <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                </ContextMenu.RadioItem>
                <ContextMenu.RadioItem
                  className='flex-row justify-between items-center gap-3'
                  value='2'
                  closeOnPress={false}
                >
                  <Text className='text-foreground text-xl'>Radio 2</Text>
                  <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                </ContextMenu.RadioItem>
              </ContextMenu.RadioGroup>
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>
                  <Text className='text-foreground text-xl'>SUB TRIGGER</Text>
                </ContextMenu.SubTrigger>

                <ContextMenu.SubContent className='bg-blue-500 '>
                  <ContextMenu.Sub className='z-50'>
                    <ContextMenu.SubTrigger>
                      <Text className='text-foreground text-xl'>
                        SUB TRIGGER
                      </Text>
                    </ContextMenu.SubTrigger>
                    <ContextMenu.SubContent className='bg-secondary'>
                      <ContextMenu.Item>
                        <Text className='text-foreground text-xl'>
                          SubItem 1
                        </Text>
                      </ContextMenu.Item>
                      <ContextMenu.CheckboxItem
                        checked={subCheckboxValue}
                        onCheckedChange={setSubCheckboxValue}
                        closeOnPress={false}
                        className='flex-row justify-between items-center gap-3'
                      >
                        <Text className='text-foreground text-xl'>
                          Is checked?
                        </Text>
                        <ContextMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
                      </ContextMenu.CheckboxItem>

                      <ContextMenu.RadioGroup
                        value={subRadioValue}
                        onValueChange={setSubRadioValue}
                      >
                        <ContextMenu.RadioItem
                          className='flex-row justify-between items-center gap-3'
                          value='1'
                          closeOnPress={false}
                        >
                          <Text className='text-foreground text-xl'>
                            Radio 1
                          </Text>
                          <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem
                          className='flex-row justify-between items-center gap-3'
                          value='2'
                          closeOnPress={false}
                        >
                          <Text className='text-foreground text-xl'>
                            Radio 2
                          </Text>
                          <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                        </ContextMenu.RadioItem>
                      </ContextMenu.RadioGroup>
                    </ContextMenu.SubContent>
                  </ContextMenu.Sub>
                  <ContextMenu.Item>
                    <Text className='text-foreground text-xl'>SubItem 1</Text>
                  </ContextMenu.Item>
                  <ContextMenu.CheckboxItem
                    checked={subCheckboxValue}
                    onCheckedChange={setSubCheckboxValue}
                    closeOnPress={false}
                    className='flex-row justify-between items-center gap-3'
                  >
                    <Text className='text-foreground text-xl'>Is checked?</Text>
                    <ContextMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
                  </ContextMenu.CheckboxItem>

                  <ContextMenu.RadioGroup
                    value={subRadioValue}
                    onValueChange={setSubRadioValue}
                  >
                    <ContextMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='1'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 1</Text>
                      <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </ContextMenu.RadioItem>
                    <ContextMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='2'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 2</Text>
                      <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </ContextMenu.RadioItem>
                  </ContextMenu.RadioGroup>
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
            </ContextMenu.Content>
            <PortalHost name={'TEST'} />
          </ContextMenu.Portal>
        </ContextMenu.Root>
        <ContextMenu.Root open={open} onOpenChange={setOpen} className='w-full'>
          <ContextMenu.Trigger className='p-8 border border-dashed rounded-xl border-sky-500 bg-sky-100/20'>
            <Text className='text-foreground text-xl text-center'>
              Inner Portal ContextMenu
            </Text>
            <Text className='text-foreground font-bold text-center'>
              LONG PRESS WITHIN DASHED BORDER
            </Text>
          </ContextMenu.Trigger>
          <ContextMenu.Portal hostName='inner'>
            <ContextMenu.Overlay className='bg-sky-500/10' />
            <ContextMenu.Content
              align='center'
              sideOffset={-headerHeight}
              insets={insets}
              className='bg-background'
            >
              <Text className='text-foreground text-xl'>TITLE</Text>
              <Text className='text-foreground text-xl'>DESCRIPTION</Text>
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>
                  <Text className='text-foreground text-xl'>SUB TRIGGER</Text>
                </ContextMenu.SubTrigger>
                <ContextMenu.SubContent className='bg-secondary'>
                  <ContextMenu.Item>
                    <Text className='text-foreground text-xl'>SubItem 1</Text>
                  </ContextMenu.Item>
                  <ContextMenu.CheckboxItem
                    checked={subCheckboxValue}
                    onCheckedChange={setSubCheckboxValue}
                    closeOnPress={false}
                    className='flex-row justify-between items-center gap-3'
                  >
                    <Text className='text-foreground text-xl'>Is checked?</Text>
                    <ContextMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
                  </ContextMenu.CheckboxItem>

                  <ContextMenu.RadioGroup
                    value={subRadioValue}
                    onValueChange={setSubRadioValue}
                  >
                    <ContextMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='1'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 1</Text>
                      <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </ContextMenu.RadioItem>
                    <ContextMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='2'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 2</Text>
                      <ContextMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </ContextMenu.RadioItem>
                  </ContextMenu.RadioGroup>
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
        <PortalHost name='inner' />
      </View>
    </>
  );
}
