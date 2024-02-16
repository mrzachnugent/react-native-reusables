import { ForceMountable } from '~/components/primitives/types';

interface ContextMenuRootProps {
  /**
   * Platform: NATIVE ONLY
   */
  open: boolean;
  onOpenChange: (value: boolean) => void;

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
};
