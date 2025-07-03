import { Button } from '@/registry/new-york/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york/components/ui/card';
import { Input } from '@/registry/new-york/components/ui/input';
import { Label } from '@/registry/new-york/components/ui/label';
import { Text } from '@/registry/new-york/components/ui/text';
import { View } from 'react-native';

export function CardPreview() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='flex-row'>
        <View className='gap-1.5 flex-1'>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </View>
        <Button variant='link'>
          <Text>Sign up</Text>
        </Button>
      </CardHeader>
      <CardContent>
        <View className='w-full justify-center gap-4'>
          <View className='gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='Name of your project' />
          </View>
          <View className='gap-2'>
            <View className='flex flex-row items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
              <Button variant='link' className='h-5 px-0 py-0 rounded-sm'>
                <Text className='font-normal'>Forgot your password?</Text>
              </Button>
            </View>
            <Input id='password' secureTextEntry />
          </View>
        </View>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Button className='w-full'>
          <Text>Login</Text>
        </Button>
        <Button variant='outline' className='w-full'>
          <Text>Login with Google</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
