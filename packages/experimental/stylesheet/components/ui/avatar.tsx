import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import type { ImageStyle } from 'react-native';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const IMAGE_STYLE: ImageStyle = {
  aspectRatio: 1,
  height: '100%',
  width: '100%',
};

const AvatarPrimitiveRoot = AvatarPrimitive.Root;
const AvatarPrimitiveImage = AvatarPrimitive.Image;
const AvatarPrimitiveFallback = AvatarPrimitive.Fallback;

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    return <AvatarPrimitiveRoot ref={ref} style={cs(styles.root, style)} {...props} />;
  }
);
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarPrimitive.ImageProps>(
  ({ style, ...props }, ref) => {
    return <AvatarPrimitiveImage ref={ref} style={cs(IMAGE_STYLE, style)} {...props} />;
  }
);
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);

    return <AvatarPrimitiveFallback ref={ref} style={cs(styles.fallback, style)} {...props} />;
  }
);
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      position: 'relative',
      height: utils.space(10),
      width: utils.space(10),
      borderRadius: utils.rounded('full'),
      overflow: 'hidden',
      flexShrink: 0,
    },
    fallback: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      borderRadius: utils.rounded('full'),
      backgroundColor: colors.muted,
    },
  };
});
