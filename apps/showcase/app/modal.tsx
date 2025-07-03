import { PortalHost } from '@rn-primitives/portal';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from 'react-native-screens';
import { Button } from '@/registry/new-york/components/ui/button';
import { Input } from '@/registry/new-york/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york/components/ui/select';
import { Text } from '@/registry/new-york/components/ui/text';

const IOS_PORTAL_HOST_NAME = 'modal-example';

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
        <View className='p-4 native:pb-24 max-w-md gap-6 w-full'>
          <View className='gap-1'>
            <Text variant='h1' className='text-foreground text-center'>
              Create an account
            </Text>
            <Text variant='muted' className='text-base text-center'>
              Enter you email below to create your account
            </Text>
          </View>
          <Input placeholder='name@example.com' />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select a role' />
            </SelectTrigger>
            <SelectContent
              insets={contentInsets}
              className='w-full'
              portalHost={Platform.select({ ios: IOS_PORTAL_HOST_NAME })}
              sideOffset={Platform.select({ ios: 16 })}
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
            <Text variant='muted'>OR CONTINUE WITH</Text>
            <View className='flex-1 h-px bg-muted' />
          </View>
          <Button>
            <Text>Github</Text>
          </Button>
          <View>
            <Text variant='muted' className='text-center'>
              By creating an account, you agree to our{' '}
              <Text variant='muted' className='underline'>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text variant='muted' className='underline'>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {Platform.OS === 'ios' && (
        <FullWindowOverlay>
          <PortalHost name={IOS_PORTAL_HOST_NAME} />
        </FullWindowOverlay>
      )}
    </>
  );
}
