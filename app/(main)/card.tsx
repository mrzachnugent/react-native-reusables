import { View, Text } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function CardScreen() {
  return (
    <View className='flex-1 justify-center p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className='text-foreground text-xl'>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text className='text-muted-foreground'>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
