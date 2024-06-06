import { ForceMountable, PressableRef } from '@rnr/types';

interface ContextMenuRootProps {
  /**
   * Platform: NATIVE ONLY
   */
  relativeTo?: 'longPress' | 'trigger';
}

interface ContextMenuPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}

interface ContextMenuOverlayProps extends ForceMountable {
  /**
   * Platform: NATIVE ONLY
   */
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
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

interface ContextMenuSubTriggerProps {
  textValue?: string;
}

interface ContextMenuTriggerRef extends PressableRef {
  /**
   * Platform: NATIVE ONLY
   */
  open: () => void;
  /**
   * Platform: NATIVE ONLY
   */
  close: () => void;
}

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuItemProps,
  ContextMenuOverlayProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerRef,
};
