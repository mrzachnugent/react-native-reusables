import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
  Users,
} from '~/components/Icons';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';

export default function DropdownMenuScreen() {
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <DropdownMenu
        open={open}
        onOpenChange={(newVal) => {
          if (!newVal) {
            setOpenSub(false);
          }
          setOpen(newVal);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <Text>Open</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className='w-64 native:w-72'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className='text-foreground' size={14} />
              <Text>Team</Text>
            </DropdownMenuItem>
            <DropdownMenuSub open={openSub} onOpenChange={setOpenSub}>
              <DropdownMenuSubTrigger>
                <UserPlus className='text-foreground' size={14} />
                <Text>Invite users</Text>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <DropdownMenuItem>
                    <Mail className='text-foreground' size={14} />
                    <Text>Email</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className='text-foreground' size={14} />
                    <Text>Message</Text>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className='text-foreground' size={14} />
                    <Text>More...</Text>
                  </DropdownMenuItem>
                </Animated.View>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className='text-foreground' size={14} />
              <Text>New Team</Text>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className='text-foreground' size={14} />
            <Text>GitHub</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className='text-foreground' size={14} />
            <Text>Support</Text>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className='text-foreground' size={14} />
            <Text>API</Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className='text-foreground' size={14} />
            <Text>Log out</Text>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
