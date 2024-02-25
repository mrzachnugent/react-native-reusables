import { View } from 'react-native';
import { Ui } from '@rnr/reusables';

const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Text } = Ui;

export default function ButtonScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
