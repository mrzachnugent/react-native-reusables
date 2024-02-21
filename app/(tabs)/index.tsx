import { Link } from 'expo-router';
import * as React from 'react';
import { Platform, View } from 'react-native';
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Info,
} from '~/components/Icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Muted, Text } from '~/components/ui/typography';
import { cn } from '~/lib/utils';

export default function ExampleScreen() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  return (
    <View className='flex-1 p-4 justify-center gap-6'>
      <Card className='w-full max-w-lg mx-auto'>
        <CardHeader>
          <View className='flex-row gap-3'>
            <CardTitle className='pt-1'>Team Members</CardTitle>
            <Tooltip
              open={isTooltipOpen}
              onOpenChange={setIsTooltipOpen}
              delayDuration={150}
            >
              <TooltipTrigger>
                <Info size={18} className='text-foreground' />
              </TooltipTrigger>
              <TooltipContent
                side='bottom'
                insets={contentInsets}
                className='gap-1 py-3 px-5'
              >
                <Text className='native:text-lg font-bold'>Things to try:</Text>
                <Text className='native:text-lg text-muted-foreground'>
                  · {Platform.OS === 'web' ? 'Hover' : 'Press'} the team
                  member's name
                </Text>
                <Text className='native:text-lg text-muted-foreground'>
                  · {Platform.OS === 'web' ? 'Right click' : 'Press and hold'}{' '}
                  the avatar
                </Text>
              </TooltipContent>
            </Tooltip>
          </View>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className='gap-8'>
          <View className='flex-row gap-3'>
            <View className='flex-1 flex-row gap-3'>
              <TeamMemberAvatar
                initials='ZN'
                name='Zach Nugent'
                uri='https://github.com/mrzachnugent.png'
              />
              <View className='flex-1'>
                <TeamMemberHoverCard name='Zach Nugent' />
                <Text numberOfLines={1} className='text-muted-foreground'>
                  zachnugent@example.com
                </Text>
              </View>
            </View>
            <RoleDropdownSelect defaultValue='Viewer' />
          </View>
          <View className='flex-row gap-3'>
            <View className='flex-1 flex-row gap-3'>
              <TeamMemberAvatar
                initials='JD'
                name='Jane Doe'
                uri='invalid link'
              />
              <View className='flex-1'>
                <TeamMemberHoverCard name='Jane Doe' />
                <Text numberOfLines={1} className='text-muted-foreground'>
                  jane@example.com
                </Text>
              </View>
            </View>
            <RoleDropdownSelect defaultValue='Owner' />
          </View>
        </CardContent>
      </Card>
      <Link href='/form' asChild>
        <Button variant='link' className='flex-row'>
          <Text>Go To Form</Text>
          <ChevronRight className='text-foreground' size={18} />
        </Button>
      </Link>
    </View>
  );
}

const contentInsets = {
  left: 12,
  right: 12,
};

function RoleDropdownSelect({ defaultValue }: { defaultValue: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex-row gap-2 native:pr-3'>
          <Text>{value}</Text>
          <ChevronDown size={18} className='text-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        insets={contentInsets}
        className='w-64 native:w-72'
      >
        <DropdownMenuLabel>Select new role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onPress={() => {
            setValue('Viewer');
          }}
          className={cn(
            'flex-col items-start gap-1',
            value === 'Viewer' ? 'bg-secondary' : ''
          )}
        >
          <Text>Viewer</Text>
          <Muted>Can view and comment.</Muted>
        </DropdownMenuItem>
        <DropdownMenuItem
          onPress={() => {
            setValue('Billing');
          }}
          className={cn(
            'flex-col items-start gap-1',
            value === 'Billing' ? 'bg-secondary' : ''
          )}
        >
          <Text>Billing</Text>
          <Muted>Can view, comment, and manage billing.</Muted>
        </DropdownMenuItem>
        <DropdownMenuItem
          onPress={() => {
            setValue('Owner');
          }}
          className={cn(
            'flex-col items-start gap-1',
            value === 'Owner' ? 'bg-secondary' : ''
          )}
        >
          <Text>Owner</Text>
          <Muted>Admin-level access to all resources</Muted>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TeamMemberHoverCard({ name }: { name: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger className='group web:hover:underline'>
        <Text className='group-active:underline'>{name}</Text>
      </HoverCardTrigger>
      <HoverCardContent insets={contentInsets} className='w-80 native:w-96'>
        <View className='flex flex-row justify-between gap-4'>
          <Avatar alt='Vercel avatar'>
            <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <View className='gap-1 flex-1'>
            <Text className='text-sm native:text-base font-semibold'>
              {name}
            </Text>
            <Text className='text-sm native:text-base'>
              Wishes they were part of the triangle company.
            </Text>
            <View className='flex flex-row items-center pt-2 gap-2'>
              <CalendarDays size={14} className='text-foreground opacity-70' />
              <Text className='text-xs native:text-sm text-muted-foreground'>
                Fingers crossed since December 2021
              </Text>
            </View>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  );
}

function TeamMemberAvatar({
  name,
  initials,
  uri,
}: {
  name: string;
  initials: string;
  uri: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = React.useState(false);
  return (
    <ContextMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal);
      }}
      relativeTo='trigger'
    >
      <ContextMenuTrigger className='web:cursor-default'>
        <Avatar alt={`${name}'s avatar`}>
          <AvatarImage source={{ uri }} />
          <AvatarFallback>
            <Text>{initials}</Text>
          </AvatarFallback>
        </Avatar>
      </ContextMenuTrigger>

      <ContextMenuContent
        align='start'
        insets={contentInsets}
        className='w-64 native:w-72'
      >
        <ContextMenuItem>
          <Text>View</Text>
        </ContextMenuItem>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <ContextMenuItem closeOnPress={false}>
              <Text className='font-semibold'>Edit</Text>
            </ContextMenuItem>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] native:w-[385px]'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to the profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogTrigger asChild>
            <ContextMenuItem closeOnPress={false}>
              <Text className='text-destructive font-semibold'>Delete</Text>
            </ContextMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Text>Continue</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
}
