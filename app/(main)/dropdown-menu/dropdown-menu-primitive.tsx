import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DropdownMenu from '~/lib/rn-primitives/todo/dropdown-menu';
import { PortalHost } from '~/lib/rn-primitives/todo/portal/portal-native';

export default function DropdownMenuPrimitiveScreen() {
  const headerHeight = useHeaderHeight();
  const [open, setOpen] = React.useState(false);
  const [openInner, setOpenInner] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const [openSub2, setOpenSub2] = React.useState(false);
  const [openSub3, setOpenSub3] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('1');
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [subRadioValue, setSubRadioValue] = React.useState('1');

  function onClose() {
    setOpenSub(false);
    setOpenSub2(false);
    setOpenSub3(false);
  }

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger className='p-8 rounded-xl bg-secondary'>
            <Text className='text-foreground text-xl text-center'>
              Open Root Portal DropdownMenu
            </Text>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Overlay className='bg-red-500/10' onPress={onClose} />
            <DropdownMenu.Content
              align='start'
              sideOffset={6}
              insets={contentInsets}
              className='bg-background w-2/3'
            >
              <DropdownMenu.Group>
                <DropdownMenu.Label className='text-foreground font-bold'>
                  Label
                </DropdownMenu.Label>
                <DropdownMenu.Item onPress={onClose}>
                  <Text className='text-foreground text-xl'>Item 1</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item onPress={onClose}>
                  <Text className='text-foreground text-xl'>Item 2</Text>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.CheckboxItem
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
                closeOnPress={false}
                className='flex-row justify-between items-center gap-3'
              >
                <Text className='text-foreground text-xl'>Is checked?</Text>
                <DropdownMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.Sub open={openSub} onOpenChange={setOpenSub}>
                <DropdownMenu.SubTrigger>
                  <Text className='text-foreground text-xl'>SUB TRIGGER</Text>
                </DropdownMenu.SubTrigger>

                <DropdownMenu.SubContent className='bg-blue-500 '>
                  <DropdownMenu.Item onPress={onClose}>
                    <Text className='text-foreground text-xl'>SubItem 1</Text>
                  </DropdownMenu.Item>
                  <DropdownMenu.CheckboxItem
                    checked={subCheckboxValue}
                    onCheckedChange={setSubCheckboxValue}
                    closeOnPress={false}
                    className='flex-row justify-between items-center gap-3'
                  >
                    <Text className='text-foreground text-xl'>
                      Sub is checked?
                    </Text>
                    <DropdownMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
                  </DropdownMenu.CheckboxItem>

                  <DropdownMenu.Sub open={openSub2} onOpenChange={setOpenSub2}>
                    <DropdownMenu.SubTrigger>
                      <Text className='text-foreground text-xl'>
                        SUB TRIGGER 2
                      </Text>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent className='bg-secondary'>
                      <DropdownMenu.Item onPress={onClose}>
                        <Text className='text-foreground text-xl'>
                          SubItem 2
                        </Text>
                      </DropdownMenu.Item>
                      <DropdownMenu.RadioGroup
                        value={subRadioValue}
                        onValueChange={setSubRadioValue}
                      >
                        <DropdownMenu.RadioItem
                          className='flex-row justify-between items-center gap-3'
                          value='1'
                          closeOnPress={false}
                        >
                          <Text className='text-foreground text-xl'>
                            Sub 2 Radio 1
                          </Text>
                          <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
                          className='flex-row justify-between items-center gap-3'
                          value='2'
                          closeOnPress={false}
                        >
                          <Text className='text-foreground text-xl'>
                            Sub 2Radio 2
                          </Text>
                          <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                        </DropdownMenu.RadioItem>
                      </DropdownMenu.RadioGroup>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.RadioGroup
                value={radioValue}
                onValueChange={setRadioValue}
              >
                <DropdownMenu.RadioItem
                  className='flex-row justify-between items-center gap-3'
                  value='1'
                  closeOnPress={false}
                >
                  <Text className='text-foreground text-xl'>Radio 1</Text>
                  <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className='flex-row justify-between items-center gap-3'
                  value='2'
                  closeOnPress={false}
                >
                  <Text className='text-foreground text-xl'>Radio 2</Text>
                  <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
            <PortalHost name={'TEST'} />
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <DropdownMenu.Root open={openInner} onOpenChange={setOpenInner}>
          <DropdownMenu.Trigger className='p-8 rounded-xl bg-secondary'>
            <Text className='text-foreground text-xl text-center'>
              Open Inner Portal DropdownMenu
            </Text>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal hostName='inner'>
            <DropdownMenu.Overlay className='bg-red-500/10' onPress={onClose} />
            <DropdownMenu.Content
              align='center'
              sideOffset={-headerHeight - (openSub3 ? 100 : 0)}
              insets={contentInsets}
              className='bg-background'
            >
              <DropdownMenu.Label className='text-foreground font-bold'>
                Label
              </DropdownMenu.Label>
              <DropdownMenu.Item onPress={onClose}>
                <Text className='text-foreground text-xl'>Item 1</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Sub open={openSub3} onOpenChange={setOpenSub3}>
                <DropdownMenu.SubTrigger>
                  <Text className='text-foreground text-xl'>SUB TRIGGER</Text>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent className='bg-secondary'>
                  <DropdownMenu.Item onPress={onClose}>
                    <Text className='text-foreground text-xl'>SubItem 1</Text>
                  </DropdownMenu.Item>
                  <DropdownMenu.CheckboxItem
                    checked={subCheckboxValue}
                    onCheckedChange={setSubCheckboxValue}
                    closeOnPress={false}
                    className='flex-row justify-between items-center gap-3'
                  >
                    <Text className='text-foreground text-xl'>Is checked?</Text>
                    <DropdownMenu.ItemIndicator className='w-2 h-4 bg-red-500' />
                  </DropdownMenu.CheckboxItem>

                  <DropdownMenu.RadioGroup
                    value={subRadioValue}
                    onValueChange={setSubRadioValue}
                  >
                    <DropdownMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='1'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 1</Text>
                      <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem
                      className='flex-row justify-between items-center gap-3'
                      value='2'
                      closeOnPress={false}
                    >
                      <Text className='text-foreground text-xl'>Radio 2</Text>
                      <DropdownMenu.ItemIndicator className='w-2 h-4 bg-blue-500' />
                    </DropdownMenu.RadioItem>
                  </DropdownMenu.RadioGroup>
                  <View className='w-10 h-52 bg-red-500' />
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <PortalHost name='inner' />
      </View>
    </>
  );
}
