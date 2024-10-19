import { PortalHost } from '@rn-primitives/portal';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from 'react-native-screens';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';

const CUSTOM_PORTAL_HOST_NAME = 'modal-example';
const WindowOverlay = Platform.OS === 'ios' ? FullWindowOverlay : React.Fragment;

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16,
    right: 16,
  };

  return (
    <>
      <View className='flex-1 justify-center items-center'>
        <View className='p-4 native:pb-24 max-w-md gap-6'>
          <View className='gap-1'>
            <H1 className='text-foreground text-center'>Create an account</H1>
            <Muted className='text-base text-center'>
              Enter you email below to create your account
            </Muted>
          </View>
          <Input placeholder='name@example.com' />
          <Select>
            <SelectTrigger>
              <SelectValue
                className='text-foreground text-sm native:text-lg'
                placeholder='Select a role'
              />
            </SelectTrigger>
            <SelectContent
              insets={contentInsets}
              className='w-full'
              portalHost={CUSTOM_PORTAL_HOST_NAME}
            >
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem label='Staff' value='staff'>
                  Staff
                </SelectItem>
                <SelectItem label='Manager' value='manager'>
                  Manager
                </SelectItem>
                <SelectItem label='Admin' value='admin'>
                  Admin
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <View className='flex-row items-center gap-3'>
            <View className='flex-1 h-px bg-muted' />
            <Muted>OR CONTINUE WITH</Muted>
            <View className='flex-1 h-px bg-muted' />
          </View>
          <Button>
            <Text>Github</Text>
          </Button>
          <View>
            <Muted className='text-center'>
              By creating an account, you agree to our{' '}
              <Muted className='underline'>Terms of Service</Muted> and{' '}
              <Muted className='underline'>Privacy Policy</Muted>
            </Muted>
          </View>
        </View>
      </View>
      <WindowOverlay>
        <PortalHost name={CUSTOM_PORTAL_HOST_NAME} />
      </WindowOverlay>
    </>
  );
}
