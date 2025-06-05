import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@rnr/components/ui/button';
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
} from '@rnr/components/ui/dropdown-menu';
import { Text } from '@rnr/components/ui/text';
import { Cloud } from '@rnr/lib/icons/Cloud';
import { Github } from '@rnr/lib/icons/Github';
import { LifeBuoy } from '@rnr/lib/icons/LifeBuoy';
import { LogOut } from '@rnr/lib/icons/LogOut';
import { Mail } from '@rnr/lib/icons/Mail';
import { MessageSquare } from '@rnr/lib/icons/MessageSquare';
import { Plus } from '@rnr/lib/icons/Plus';
import { PlusCircle } from '@rnr/lib/icons/PlusCircle';
import { User } from '@rnr/lib/icons/User';
import { UserPlus } from '@rnr/lib/icons/UserPlus';
import { Users } from '@rnr/lib/icons/Users';

export default function DropdownMenuPreview() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <DropdownMenu>
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
            <User className='text-foreground' size={14} />
            <Text>Profile</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className='text-foreground' size={14} />
            <Text>Team</Text>
          </DropdownMenuItem>
          <DropdownMenuSub>
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
  );
}
