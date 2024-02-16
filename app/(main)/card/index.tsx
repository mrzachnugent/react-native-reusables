import { View, Text } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/old-ui/card';

export default function CardScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Card className='w-full max-w-xl'>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className='text-foreground native:text-xl'>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text className='text-muted-foreground'>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
