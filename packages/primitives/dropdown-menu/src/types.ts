import type { ForceMountable, PressableRef } from '@rnr/types';

interface DropdownMenuPortalProps extends ForceMountable {
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

interface DropdownMenuOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

interface DropdownMenuItemProps {
  textValue?: string;
  closeOnPress?: boolean;
}

interface DropdownMenuCheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
}

interface DropdownMenuRadioGroupProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

interface DropdownMenuRadioItemProps {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
}

interface DropdownMenuSeparatorProps {
  decorative?: boolean;
}

interface DropdownMenuSubProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

interface DropdownMenuSubTriggerProps {
  textValue?: string;
}

interface DropdownMenuTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuItemProps,
  DropdownMenuOverlayProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerRef,
};
