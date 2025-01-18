import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';

const SOURCE = { uri: 'https://github.com/mrzachnugent.png' };

export function AvatarPreview() {
  return (
    <Avatar alt="Zach Nugent's Avatar">
      <AvatarImage source={SOURCE} />
      <AvatarFallback>
        <Text>ZN</Text>
      </AvatarFallback>
    </Avatar>
  );
}
