import { Icon } from '@showcase/components/styles/ui';
import { cn } from '@/registry/new-york/lib/utils';
import { router } from 'expo-router';
import { SettingsIcon } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SettingsNavLink() {
  const [isAnimating, setIsAnimating] = React.useState(false);

  function goToSettings() {
    setIsAnimating(true);
    hapticCogTurning();
    router.push('/settings');
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  return (
    <Pressable hitSlop={24} onPress={goToSettings} className='active:opacity-70'>
      <View className='justify-center items-start py-2.5 pl-8 pr-1 web:pr-5'>
        <View className={cn('animate-none', isAnimating && 'animate-spin')}>
          <Icon as={SettingsIcon} className='text-muted-foreground size-6 stroke-[1.5px]' />
        </View>
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
