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
import { useIsDarkMode } from '@docs/components/preview-card';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

export default function ComponentsGrid() {
  const isDark = useIsDarkMode();
  const [nativePreview, setNativePreview] = useState(false);

  return (
    <div className="flex flex-col gap-4 max-2xl:px-4">
      <div className="flex w-full justify-between">
        <div className="bg-fd-background flex items-center gap-1 rounded-md border pl-2.5 pr-0.5 py-0.5 text-xs relative">
          <span className="text-muted-foreground">Platform:</span>{' '}
          <button
            className={`py-0.25 px-1.5 cursor-pointer rounded-sm border duration-150 ${!nativePreview ? 'bg-white shadow dark:bg-neutral-800' : 'border-transparent'}`}
            onClick={()=> setNativePreview(false)}
          >
            Web
          </button>
          <button
            className={`py-0.25 px-1.5 cursor-pointer rounded-sm border duration-150 ${nativePreview ? 'bg-white shadow dark:bg-neutral-800' : 'border-transparent'}`}
            onClick={() => setNativePreview(true)}
          >
            Native
          </button>
          <div className={`absolute left-0 shadow-xl z-20 top-10 border-r border-b flex max-w-sm flex-col items-center gap-6 p-4 dark:bg-black rounded-lg border-dashed bg-white duration-300 ${nativePreview ? 'opacity-100 translate-y-0 blur-0' : 'blur-md opacity-0 pointer-events-none -translate-y-2'}`}>
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

      <Image
        src="/mobile-component-previews/default_dark.png"
        alt="Components Grid"
        width={2520}
        height={1704}
        className="rounded-lg md:hidden hidden max-md:dark:block"
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
