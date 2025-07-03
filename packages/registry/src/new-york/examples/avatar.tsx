import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york/components/ui/avatar';
import { Text } from '@/registry/new-york/components/ui/text';
import { View } from 'react-native';

export function AvatarPreview() {
  return (
    <View className='flex-row gap-12 flex-wrap'>
      <Avatar
        alt='@mrzachnugent'
        className='border-2 border-background web:border-0 web:ring-2 web:ring-background'
      >
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar
        alt='@shadcn'
        className='border-2 border-background web:border-0 web:ring-2 web:ring-background rounded-lg'
      >
        <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
        <AvatarFallback>
          <Text>CN</Text>
        </AvatarFallback>
      </Avatar>
      <View className='flex-row'>
        <Avatar
          alt='@mrzachnugent'
          className='-mr-2 border-2 border-background web:border-0 web:ring-2 web:ring-background'
        >
          <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar
          alt='@leerob'
          className='-mr-2 border-2 border-background web:border-0 web:ring-2 web:ring-background'
        >
          <AvatarImage source={{ uri: 'https://github.com/leerob.png' }} />
          <AvatarFallback>
            <Text>LR</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar
          alt='@evilrabbit'
          className='-mr-2 border-2 border-background web:border-0 web:ring-2 web:ring-background'
        >
          <AvatarImage source={{ uri: 'https://github.com/evilrabbit.png' }} />
          <AvatarFallback>
            <Text>ER</Text>
          </AvatarFallback>
        </Avatar>
      </View>
    </View>
  );
}
