import { NativeOnlyAnimatedView } from '@/new-york/components/ui/native-only-animated-view';
import { TextClassContext } from '@/new-york/components/ui/text';
import { cn } from '@/new-york/lib/utils';
import * as PopoverPrimitive from '@rn-primitives/popover';
import { Platform, StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  portalHost,
  ...props
}: PopoverPrimitive.ContentProps & {
  ref?: React.RefObject<PopoverPrimitive.ContentRef>;
  portalHost?: string;
}) {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
        <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextClassContext.Provider value='text-popover-foreground'>
            <PopoverPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              className={cn(
                'bg-popover z-50 w-72 rounded-md border border-border p-4 shadow-md outline-hidden',
                Platform.select({
                  web: cn(
                    'animate-in fade-in-0 zoom-in-95 origin-(--radix-popover-content-transform-origin) ',
                    props.side === 'bottom' && 'slide-in-from-top-2',
                    props.side === 'top' && 'slide-in-from-bottom-2'
                  ),
                  native: 'shadow-black/5',
                }),
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </NativeOnlyAnimatedView>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
