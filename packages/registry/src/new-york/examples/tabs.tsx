import { Button } from '@/new-york/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/new-york/components/ui/card';
import { Input } from '@/new-york/components/ui/input';
import { Label } from '@/new-york/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/new-york/components/ui/tabs';
import { Text } from '@/new-york/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export function TabsPreview() {
  const [value, setValue] = React.useState('account');
  return (
    <View className='flex w-full max-w-sm flex-col gap-6'>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value='account'>
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value='password'>
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-6'>
              <View className='gap-3'>
                <Label htmlFor='tabs-demo-name'>Name</Label>
                <Input id='tabs-demo-name' defaultValue='Pedro Duarte' />
              </View>
              <View className='gap-3'>
                <Label htmlFor='tabs-demo-username'>Username</Label>
                <Input id='tabs-demo-username' defaultValue='@peduarte' />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-6'>
              <View className='gap-3'>
                <Label htmlFor='tabs-demo-current'>Current password</Label>
                <Input id='tabs-demo-current' secureTextEntry />
              </View>
              <View className='gap-3'>
                <Label htmlFor='tabs-demo-new'>New password</Label>
                <Input id='tabs-demo-new' secureTextEntry />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
