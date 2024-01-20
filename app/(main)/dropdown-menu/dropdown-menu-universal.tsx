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
} from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonText } from '~/components/universal-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemText,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/universal-ui/dropdown-menu';

export default function DropdownMenuUniversalScreen() {
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
            <ButtonText>Open</ButtonText>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          insets={contentInsets}
          className='w-64 native:w-72'
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className='text-foreground' size={14} />
              <DropdownMenuItemText>Team</DropdownMenuItemText>
            </DropdownMenuItem>
            <DropdownMenuSub open={openSub} onOpenChange={setOpenSub}>
              <DropdownMenuSubTrigger>
                <UserPlus className='text-foreground' size={14} />
                <DropdownMenuItemText>Invite users</DropdownMenuItemText>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <DropdownMenuItem>
                    <Mail className='text-foreground' size={14} />
                    <DropdownMenuItemText>Email</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className='text-foreground' size={14} />
                    <DropdownMenuItemText>Message</DropdownMenuItemText>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className='text-foreground' size={14} />
                    <DropdownMenuItemText>More...</DropdownMenuItemText>
                  </DropdownMenuItem>
                </Animated.View>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className='text-foreground' size={14} />
              <DropdownMenuItemText>New Team</DropdownMenuItemText>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className='text-foreground' size={14} />
            <DropdownMenuItemText>GitHub</DropdownMenuItemText>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className='text-foreground' size={14} />
            <DropdownMenuItemText>Support</DropdownMenuItemText>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className='text-foreground' size={14} />
            <DropdownMenuItemText>API</DropdownMenuItemText>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className='text-foreground' size={14} />
            <DropdownMenuItemText>Log out</DropdownMenuItemText>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
