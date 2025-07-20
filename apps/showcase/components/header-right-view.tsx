import { Button, Icon, Text } from '@showcase/components/styles/ui';
import { router } from 'expo-router';
import * as Updates from 'expo-updates';
import { SettingsIcon } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

export function HeaderRightView() {
  const { isUpdateAvailable, isUpdatePending, isDownloading } = Updates.useUpdates();

  async function onReload() {
    try {
      if (!isUpdatePending) {
        await Updates.fetchUpdateAsync();
      }
      await Updates.reloadAsync();
    } catch (error) {
      console.error(error);
    }
  }

  function goToTheming() {
    router.push('/theming');
  }

  if (isUpdateAvailable) {
    return (
      <Button
        size='sm'
        className='rounded-full h-7 bg-sky-500 dark:bg-sky-600'
        onPress={onReload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator color='white' size='small' className='scale-75' />
        ) : (
          <Text className='text-white'>Update</Text>
        )}
      </Button>
    );
  }

  return (
    <Pressable hitSlop={8} onPress={goToTheming} className='active:opacity-70'>
      <View className='justify-center items-start py-2.5 pl-8 pr-1 web:pr-5'>
        <Icon as={SettingsIcon} className='text-foreground/90 size-6 ' />
      </View>
    </Pressable>
  );
}
