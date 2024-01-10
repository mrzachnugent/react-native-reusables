import type { ViewStyle } from 'react-native';
import { ForceMountable } from '../types';

interface ContextMenuRootProps {
  /**
   * Platform: ONLY NATIVE AND MADATORY
   */
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface ContextMenuPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: NATIVE ONLY
   */
  overlay?: JSX.Element | null;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}

interface ContextMenuOverlayProps extends ForceMountable {
  style?: ViewStyle;
  closeOnPress?: boolean;
}

interface ContextMenuItemProps {
  textValue?: string;
  closeOnPress?: boolean;
}

interface ContextMenuCheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
}

interface ContextMenuRadioGroupProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

interface ContextMenuRadioItemProps {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
}

interface ContextMenuSeparatorProps {
  decorative?: boolean;
}

interface ContextMenuSubProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface ContextMenuSubTriggerProps {
  textValue?: string;
}

export type {
  ContextMenuRootProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubProps,
  ContextMenuRadioItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuPortalProps,
  ContextMenuCheckboxItemProps,
  ContextMenuSeparatorProps,
  ContextMenuItemProps,
  ContextMenuOverlayProps,
};
