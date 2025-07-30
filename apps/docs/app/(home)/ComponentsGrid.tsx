'use client';
import {
  AccordionPreview,
  AlertPreview,
  AlertDialogPreview,
  AspectRatioPreview,
  AvatarPreview,
  BadgePreview,
  ButtonPreview,
  // CardPreview,
  CheckboxPreview,
  CollapsiblePreview,
  ContextMenuPreview,
  DialogPreview,
  DropdownMenuPreview,
  HoverCardPreview,
  InputPreview,
  LabelPreview,
  MenubarPreview,
  PopoverPreview,
  ProgressPreview,
  RadioGroupPreview,
  SelectPreview,
  // SeparatorPreview,
  // SkeletonPreview,
  SwitchPreview,
  TabsPreview,
  // TextPreview,
  TextareaPreview,
  // TogglePreview,
  ToggleGroupPreview,
  TooltipPreview,
} from '@docs/components/default-previews';
import {
  AccordionPreview as AccordionNewYorkPreview,
  AlertPreview as AlertNewYorkPreview,
  AlertDialogPreview as AlertDialogNewYorkPreview,
  AspectRatioPreview as AspectRatioNewYorkPreview,
  AvatarPreview as AvatarNewYorkPreview,
  BadgePreview as BadgeNewYorkPreview,
  ButtonPreview as ButtonNewYorkPreview,
  // CardPreview as CardNewYorkPreview,
  CheckboxPreview as CheckboxNewYorkPreview,
  CollapsiblePreview as CollapsibleNewYorkPreview,
  ContextMenuPreview as ContextMenuNewYorkPreview,
  DialogPreview as DialogNewYorkPreview,
  DropdownMenuPreview as DropdownMenuNewYorkPreview,
  HoverCardPreview as HoverCardNewYorkPreview,
  InputPreview as InputNewYorkPreview,
  LabelPreview as LabelNewYorkPreview,
  MenubarPreview as MenubarNewYorkPreview,
  PopoverPreview as PopoverNewYorkPreview,
  ProgressPreview as ProgressNewYorkPreview,
  RadioGroupPreview as RadioGroupNewYorkPreview,
  SelectPreview as SelectNewYorkPreview,
  // SeparatorPreview as SeparatorNewYorkPreview,
  // SkeletonPreview as SkeletonNewYorkPreview,
  SwitchPreview as SwitchNewYorkPreview,
  TabsPreview as TabsNewYorkPreview,
  // TextPreview as TextNewYorkPreview,
  TextareaPreview as TextareaNewYorkPreview,
  // TogglePreview as ToggleNewYorkPreview,
  ToggleGroupPreview as ToggleGroupNewYorkPreview,
  TooltipPreview as TooltipNewYorkPreview,
} from '@docs/components/new-york-previews';
import { StyleSwitcher } from '@docs/components/preview-card';
import { useReactiveGetCookie, useReactiveSetCookie } from 'cookies-next/client';
import Image from 'next/image';

const STYLES = [
  { name: 'new-york', label: 'New York' },
  { name: 'default', label: 'Default' },
] as const;

type Style = (typeof STYLES)[number]['name'];

export default function ComponentsGrid() {
  const getCookie = useReactiveGetCookie();
  const setCookie = useReactiveSetCookie();
  const style = getCookie('style') ?? 'new-york';
  function onStyleChange(value: Style) {
    setCookie('style', value);
  }
  return (
    <div className="flex flex-col gap-4 max-2xl:px-4">
      <div className="flex w-full justify-between">
        <StyleSwitcher onValueChange={onStyleChange} defaultValue="default" value={style} />
        <div className="bg-fd-background flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs">
          <span className="text-muted-foreground">Platform:</span>{' '}
          <div className="py-0.25 cursor-pointer rounded-sm border bg-white px-1.5 shadow dark:bg-neutral-800">
            Web
          </div>
          {/* // TODO: link to Showcase popup */}
          <div className="cursor-pointer">Native</div>
        </div>
      </div>

      {/* // TODO: add light mode hide with dark: */}
      <Image
        src={`${style === 'default' ? '/mobile-component-previews/default_dark.png' : '/mobile-component-previews/newyork_dark.png'}`}
        alt="Components Grid"
        width={2520}
        height={1704}
        className="rounded-lg md:hidden"
      />

      <div className="dark:from-fd-background dark:to-fd-accent/70 to-fd-accent relative flex w-full flex-wrap overflow-clip rounded-lg border border-dashed bg-gradient-to-bl from-white max-md:hidden">
        {/* // TODO: adjust for md-to-xl breakpoint, some stuff wraps ugly */}
        <div className="flex w-full flex-wrap items-center border-b">
          <div className="border-r p-4">
            {style === 'default' ? <HoverCardPreview /> : <HoverCardNewYorkPreview />}
          </div>
          <div className="flex justify-end border-r p-4">
            {style === 'default' ? <SelectPreview /> : <SelectNewYorkPreview />}
          </div>
          <div className="flex justify-center border-r p-4">
            {style === 'default' ? <MenubarPreview /> : <MenubarNewYorkPreview />}
          </div>
          <div className="flex w-full flex-1 items-center justify-center border-r p-4 max-xl:hidden">
            {style === 'default' ? <ProgressPreview /> : <ProgressNewYorkPreview />}
          </div>
          <div className="border-r p-4">
            {style === 'default' ? <ToggleGroupPreview /> : <ToggleGroupNewYorkPreview />}
          </div>
          <div className="ml-auto flex justify-center border-r p-4">
            {style === 'default' ? <ButtonPreview /> : <ButtonNewYorkPreview />}
          </div>
          <div className="p-4 max-xl:hidden">
            {style === 'default' ? <AvatarPreview /> : <AvatarNewYorkPreview />}
          </div>
        </div>
        <div className="flex max-xl:flex-col max-lg:flex-1">
          <div className="border-r xl:flex-1">
            <div className="relative p-4">
              {style === 'default' ? <CheckboxPreview /> : <CheckboxNewYorkPreview />}
            </div>
            <div className="relative border-t px-6">
              {style === 'default' ? <AccordionPreview /> : <AccordionNewYorkPreview />}
            </div>
            <div className="relative border-t p-4">
              {style === 'default' ? <AlertPreview /> : <AlertNewYorkPreview />}
            </div>
            {/* <div className="col-span-2 border-t p-4">
            {style === 'default' ? <AspectRatioPreview /> : <AspectRatioNewYorkPreview />}
          </div> */}
          </div>
          <div className="w-full border-r xl:w-[400px]">
            {/* <div className="flex w-full justify-center p-4 py-10">
            {style === 'default' ? <ContextMenuPreview /> : <ContextMenuNewYorkPreview />}
            </div> */}
            <div className="p-5">
              {style === 'default' ? <BadgePreview /> : <BadgeNewYorkPreview />}
            </div>
            <div className="border-t p-4">
              {style === 'default' ? <CollapsiblePreview /> : <CollapsibleNewYorkPreview />}
            </div>
            <div className="border-t p-4">
              {style === 'default' ? <TabsPreview /> : <TabsNewYorkPreview />}
            </div>
            <div className="border-t p-5">
              {style === 'default' ? <SwitchPreview /> : <SwitchNewYorkPreview />}
            </div>
            <div className="border-t p-5">
              {style === 'default' ? <RadioGroupPreview /> : <RadioGroupNewYorkPreview />}
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="flex w-full justify-end p-4 xl:hidden">
            {style === 'default' ? <AvatarPreview /> : <AvatarNewYorkPreview />}
          </div>
          <div className="p-4">
            {style === 'default' ? <AspectRatioPreview /> : <AspectRatioNewYorkPreview />}
          </div>
          <div className="border-t p-4 xl:hidden">
            {style === 'default' ? <ProgressPreview /> : <ProgressNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <InputPreview /> : <InputNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <TextareaPreview /> : <TextareaNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <LabelPreview /> : <LabelNewYorkPreview />}
          </div>

          <div className="border-t p-4">
            {style === 'default' ? <AlertDialogPreview /> : <AlertDialogNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <DialogPreview /> : <DialogNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <PopoverPreview /> : <PopoverNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <TooltipPreview /> : <TooltipNewYorkPreview />}
          </div>
          <div className="border-t p-4">
            {style === 'default' ? <DropdownMenuPreview /> : <DropdownMenuNewYorkPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}
