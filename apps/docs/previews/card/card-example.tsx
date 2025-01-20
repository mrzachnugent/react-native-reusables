import { View } from '@/components/react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { Check } from '~/lib/icons/Check';
import { Sparkles } from '~/lib/icons/Sparkles';

const NOTIFICATIONS = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

export function CardExample() {
  return (
    <Card style={{ width: '100%', maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className='gap-4'>
        <View className='flex-row items-center gap-4 rounded-md border p-4'>
          <Sparkles />
          <View className='flex-1'>
            <Text className='text-sm font-medium'>Push Notifications</Text>
            <Text role='heading' className='text-sm text-muted-foreground '>
              Send notifications to device.
            </Text>
          </View>
          {/* TODO */}
          {/* @ts-expect-error requires onCheckedChange prop */}
          <Switch disabled checked={false} />
        </View>
        <View>
          {NOTIFICATIONS.map((notification, index) => (
            <View key={index} className='flex-row mb-2 pb-2 last:mb-0 last:pb-0'>
              <View className='w-6'>
                <View className='h-2 w-2 mt-1 rounded-full bg-destructive' />
              </View>
              <View className='gap-1'>
                <View>
                  <Text className='text-sm font-medium leading-none'>{notification.title}</Text>
                </View>
                <Text className='text-sm text-muted-foreground'>{notification.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>
          <Check /> <Text>Mark all as read</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
