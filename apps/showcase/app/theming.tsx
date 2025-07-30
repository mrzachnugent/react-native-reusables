import { Checkbox } from '@/registry/ui/checkbox';
import { Label } from '@/registry/ui/label';
import { Text } from '@/registry/ui/text';
import { useStyle } from '@showcase/lib/style-provider';
import { cn } from '@showcase/lib/utils';
import * as Haptics from 'expo-haptics';
import { Platform, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center gap-4 p-4">
      <RadioCheckbox
        style="new-york"
        title="New York"
        description="Compact and modern with smaller components, and subtle shadows."
      />
      <RadioCheckbox
        style="default"
        title="Default"
        description="Spacious and minimal with larger components, and little to no shadows."
      />
      <Text className="px-4 text-center text-xs opacity-80">
        Your app's style can be set in the <Text variant="code">components.json</Text>.
      </Text>
    </View>
  );
}

function RadioCheckbox({
  style,
  title,
  description,
}: {
  style: 'new-york' | 'default';
  title: string;
  description: string;
}) {
  const { style: selectedStyle, setStyle } = useStyle();
  const derivedStyle = useDerivedValue(() => selectedStyle, [selectedStyle]);

  const fontSizeStyle = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(derivedStyle.value === 'default' ? 16 : 14),
    };
  });

  function onPress(style: 'new-york' | 'default') {
    return () => {
      if (selectedStyle !== style) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setStyle(style);
      }
    };
  }

  return (
    <Label
      onPress={Platform.select({ native: onPress(style) })}
      htmlFor={style}
      className={cn(
        'web:hover:bg-accent/50 border-border flex max-w-md flex-row rounded-lg border p-3 shadow-none',
        selectedStyle === 'new-york' && 'shadow-md shadow-black/5',
        style === selectedStyle &&
          'web:hover:bg-blue-50 border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'
      )}>
      <View className="flex flex-1 flex-row items-start gap-3">
        <Checkbox
          id={style}
          checked={style === selectedStyle}
          onCheckedChange={onPress(style)}
          className="mt-0.5"
          checkedClassName="border-blue-600 bg-blue-600 dark:border-blue-700"
          indicatorClassName="bg-blue-600 dark:bg-blue-700"
          iconClassName="text-white"
        />
        <View className="flex-1">
          <Animated.Text style={fontSizeStyle} className="text-foreground font-medium">
            {title}
          </Animated.Text>
          <Text className="text-muted-foreground text-sm">{description}</Text>
        </View>
      </View>
    </Label>
  );
}
