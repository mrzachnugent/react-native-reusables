import React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';

export default function SkeletonScreen() {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isLoading]);

  return (
    <View className='flex-1 justify-center items-center'>
      <Skeleton
        key={`skeleton-${isLoading}`} // key is not needed if loading only goes one way (not toggled)
        show={isLoading}
        radius={5}
        width={200}
      >
        <Button
          disabled={isLoading}
          onPress={() => {
            setIsLoading(true);
          }}
        >
          Show Loading
        </Button>
      </Skeleton>
    </View>
  );
}
