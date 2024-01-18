import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from '~/components/universal-ui/card';

export default function ButtonUniversalScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <CardText>Card Content</CardText>
        </CardContent>
        <CardFooter>
          <CardText>Card Footer</CardText>
        </CardFooter>
      </Card>
    </View>
  );
}
