import { ForceMountable } from '@rnr/types';

interface MenubarRootProps {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
}

interface MenubarMenuProps {
  value: string | undefined;
}

interface MenubarPortalProps extends ForceMountable {
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

interface MenubarOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

interface MenubarItemProps {
  textValue?: string;
  closeOnPress?: boolean;
}

interface MenubarCheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
}

interface MenubarRadioGroupProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

interface MenubarRadioItemProps {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
}

interface MenubarSeparatorProps {
  decorative?: boolean;
}

interface MenubarSubProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface MenubarSubTriggerProps {
  textValue?: string;
}

export type {
  MenubarCheckboxItemProps,
  MenubarItemProps,
  MenubarMenuProps,
  MenubarOverlayProps,
  MenubarPortalProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarRootProps,
  MenubarSeparatorProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
};
