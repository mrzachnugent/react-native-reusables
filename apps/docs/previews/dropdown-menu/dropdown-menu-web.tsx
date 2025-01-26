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
import { Cloud } from '~/lib/icons/Cloud';
import { Github } from '~/lib/icons/Github';
import { LifeBuoy } from '~/lib/icons/LifeBuoy';
import { LogOut } from '~/lib/icons/LogOut';
import { Mail } from '~/lib/icons/Mail';
import { MessageSquare } from '~/lib/icons/MessageSquare';
import { Plus } from '~/lib/icons/Plus';
import { PlusCircle } from '~/lib/icons/PlusCircle';
import { User } from '~/lib/icons/User';
import { UserPlus } from '~/lib/icons/UserPlus';
import { Users } from '~/lib/icons/Users';

export function DropdownMenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Text>Open</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 native:w-72'>
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
