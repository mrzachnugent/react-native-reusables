'use client';
import {
  AccordionPreview,
  AlertDialogPreview,
  AlertPreview,
  AspectRatioPreview,
  AvatarPreview,
  BadgePreview,
  ButtonPreview,
  // CardPreview,
  CheckboxPreview,
  CollapsiblePreview,
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
import { useIsDarkMode } from '@docs/components/preview-card';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import * as React from 'react';

export default function ComponentsGrid() {
  const isDark = useIsDarkMode();
  const [nativePreview, setNativePreview] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 max-2xl:px-4">
      <div className="hidden w-fit sm:block">
        <div className="bg-fd-background relative flex items-center gap-1 rounded-md border py-0.5 pl-2.5 pr-0.5 text-xs">
          <span className="text-muted-foreground">Platform:</span>{' '}
          <button
            className={`cursor-pointer rounded-sm border px-1.5 py-1 duration-150 ${!nativePreview ? 'bg-white shadow dark:bg-neutral-800' : 'hover:bg-fd-accent/70 border-transparent'}`}
            onClick={() => setNativePreview(false)}>
            Web
          </button>
          <button
            className={`cursor-pointer rounded-sm border px-1.5 py-1 duration-150 ${nativePreview ? 'bg-white shadow dark:bg-neutral-800' : 'hover:bg-fd-accent/70 border-transparent'}`}
            onClick={() => setNativePreview(true)}>
            Native
          </button>
          <div
            className={`absolute left-0 top-10 z-20 flex max-w-sm flex-col items-center gap-6 rounded-lg border border-dashed bg-white p-4 shadow-xl duration-100 dark:bg-black ${nativePreview ? 'translate-y-0 opacity-100 blur-0' : 'pointer-events-none -translate-y-2 opacity-0 blur-md'}`}>
            <QRCodeSVG
              value="https://reactnativereusables.com/showcase/links/home-screen"
              bgColor={isDark ? 'black' : 'white'}
              fgColor={isDark ? 'white' : 'black'}
              size={230}
              level="H"
            />
            <p className="text-center font-mono text-sm">Scan to preview.</p>
          </div>
        </div>
      </div>
      <div className="sm:hidden" />

      <Image
        src="/mobile-component-previews/default_dark.png"
        alt="Components Grid"
        width={2520}
        height={1704}
        className="hidden rounded-lg md:hidden max-md:dark:block"
      />
      <Image
        src="/mobile-component-previews/default_light.png"
        alt="Components Grid"
        width={2520}
        height={1704}
        className="rounded-lg md:hidden dark:hidden"
      />

      <div className="dark:from-fd-background dark:to-fd-accent/70 to-fd-accent relative flex w-full flex-wrap overflow-clip rounded-lg border border-dashed bg-gradient-to-bl from-white max-md:hidden">
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
          <div className="ml-auto flex justify-center p-4 max-[857px]:hidden xl:border-r">
            <ButtonPreview />
          </div>
          <div className="p-4 max-xl:hidden">
            <AvatarPreview />
          </div>
        </div>
        <div className="flex max-xl:flex-col max-lg:flex-1">
          <div className="border-r lg:w-[572.5px] xl:flex-1">
            <div className="relative p-4">
              <CheckboxPreview />
            </div>
            <div className="relative border-t px-6">
              <AccordionPreview />
            </div>
            <div className="relative border-t p-4">
              <AlertPreview />
            </div>
          </div>
          <div className="w-full border-r xl:w-[400px]">
            {/* <div className="flex w-full justify-center p-4 py-10">
              <ContextMenuPreview /> 
            </div> */}
            <div className="p-5 max-lg:hidden">
              <BadgePreview />
            </div>
            <div className="border-t p-4 max-xl:hidden">
              <CollapsiblePreview />
            </div>
            <div className="border-t p-4">
              <TabsPreview />
            </div>
            <div className="border-t p-5 max-xl:hidden">
              <SwitchPreview />
            </div>
            <div className="border-t p-5 max-xl:hidden">
              <RadioGroupPreview />
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="flex w-full justify-end border-b p-4 xl:hidden">
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

          <div className="hidden border-t p-5 max-xl:block">
            <SwitchPreview />
          </div>
          <div className="hidden border-t p-5 max-xl:block">
            <RadioGroupPreview />
          </div>
          <div className="hidden border-t p-4 max-xl:block">
            <CollapsiblePreview />
          </div>
          <div className="hidden p-5 max-lg:block">
            <BadgePreview />
          </div>
          <div className="ml-auto hidden justify-center border-t p-4 max-[857px]:flex">
            <ButtonPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
