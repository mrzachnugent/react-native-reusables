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
} from '@docs/components/examples';
import Image from 'next/image';

export default function ComponentsGrid() {
  return (
    <div className="flex flex-col gap-4 max-2xl:px-4">
      <div className="flex w-full justify-between">
        {/* <StyleSwitcher onValueChange={onStyleChange} defaultValue="default" value={style} /> */}
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
        src="/mobile-component-previews/default_dark.png"
        alt="Components Grid"
        width={2520}
        height={1704}
        className="rounded-lg md:hidden"
      />

      <div className="dark:from-fd-background dark:to-fd-accent/70 to-fd-accent relative flex w-full flex-wrap overflow-clip rounded-lg border border-dashed bg-gradient-to-bl from-white max-md:hidden">
        {/* // TODO: adjust for md-to-xl breakpoint, some stuff wraps ugly */}
        <div className="flex w-full flex-wrap items-center border-b">
          <div className="border-r p-4">
            <HoverCardPreview />
          </div>
          <div className="flex justify-end border-r p-4">
            <SelectPreview />
          </div>
          <div className="flex justify-center border-r p-4">
            <MenubarPreview />
          </div>
          <div className="flex w-full flex-1 items-center justify-center border-r p-4 max-xl:hidden">
            <ProgressPreview />
          </div>
          <div className="border-r p-4">
            <ToggleGroupPreview />
          </div>
          <div className="ml-auto flex justify-center border-r p-4">
            <ButtonPreview />
          </div>
          <div className="p-4 max-xl:hidden">
            <AvatarPreview />
          </div>
        </div>
        <div className="flex max-xl:flex-col max-lg:flex-1">
          <div className="border-r xl:flex-1">
            <div className="relative p-4">
              <CheckboxPreview />
            </div>
            <div className="relative border-t px-6">
              <AccordionPreview />
            </div>
            <div className="relative border-t p-4">
              <AlertPreview />
            </div>
            {/* <div className="col-span-2 border-t p-4">
            <AspectRatioPreview /> 
          </div> */}
          </div>
          <div className="w-full border-r xl:w-[400px]">
            {/* <div className="flex w-full justify-center p-4 py-10">
            <ContextMenuPreview /> 
            </div> */}
            <div className="p-5">
              <BadgePreview />
            </div>
            <div className="border-t p-4">
              <CollapsiblePreview />
            </div>
            <div className="border-t p-4">
              <TabsPreview />
            </div>
            <div className="border-t p-5">
              <SwitchPreview />
            </div>
            <div className="border-t p-5">
              <RadioGroupPreview />
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="flex w-full justify-end p-4 xl:hidden">
            <AvatarPreview />
          </div>
          <div className="p-4">
            <AspectRatioPreview />
          </div>
          <div className="border-t p-4 xl:hidden">
            <ProgressPreview />
          </div>
          <div className="border-t p-4">
            <InputPreview />
          </div>
          <div className="border-t p-4">
            <TextareaPreview />
          </div>
          <div className="border-t p-4">
            <LabelPreview />
          </div>

          <div className="border-t p-4">
            <AlertDialogPreview />
          </div>
          <div className="border-t p-4">
            <DialogPreview />
          </div>
          <div className="border-t p-4">
            <PopoverPreview />
          </div>
          <div className="border-t p-4">
            <TooltipPreview />
          </div>
          <div className="border-t p-4">
            <DropdownMenuPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
