import { Button, Icon, Text } from '@showcase/components/styles/ui';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import * as Updates from 'expo-updates';
import { SettingsIcon } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function HeaderRightView() {
  const { isUpdateAvailable, isUpdatePending, isDownloading } = Updates.useUpdates();
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  }, []);

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
    rotation.value = 0;
    rotation.value = withTiming(180);
    hapticCogTurning();
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
    <Pressable hitSlop={24} onPress={goToTheming} className='active:opacity-70'>
      <View className='justify-center items-start py-2.5 pl-8 pr-1 web:pr-5'>
        <Animated.View style={animatedStyle}>
          <Icon as={SettingsIcon} className='text-foreground/90 size-6 ' />
        </Animated.View>
      </View>
    </Pressable>
  );
}

async function hapticCogTurning() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  setTimeout(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }, 125);
  }, 75);
}
