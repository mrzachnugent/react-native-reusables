import { View } from '@docs/components/react-native';
import { Button } from '@rnr/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@rnr/components/ui/card';
import { Input } from '@rnr/components/ui/input';
import { Label } from '@rnr/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rnr/components/ui/select';
import { Text } from '@rnr/components/ui/text';

export function CardPreview() {
  return (
    <Card style={{ width: '100%', maxWidth: 350 }}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <View className='w-full justify-center gap-4'>
          <View className='gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='Name of your project' />
          </View>
          <View className='gap-1.5'>
            <Label htmlFor='framework'>Framework</Label>
            <Select>
              <SelectTrigger id='framework'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem label='Next.js' value='next'>
                  <Text>Next.js</Text>
                </SelectItem>
                <SelectItem label='SvelteKit' value='sveltekit'>
                  <Text>SvelteKit</Text>
                </SelectItem>
                <SelectItem label='Astro' value='astro'>
                  <Text>Astro</Text>
                </SelectItem>
                <SelectItem label='Nuxt.js' value='nuxt'>
                  <Text>Nuxt.js</Text>
                </SelectItem>
              </SelectContent>
            </Select>
          </View>
        </View>
      </CardContent>
      <CardFooter className='justify-between'>
        <Button variant='outline'>
          <Text>Cancel</Text>
        </Button>
        <Button>
          <Text>Deploy</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
