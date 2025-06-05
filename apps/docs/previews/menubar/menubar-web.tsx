import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Text } from '@/components/ui/text';

// TODO(zach): fix primitive + double enter animation

export function MenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu value='file'>
        <MenubarTrigger>
          <Text>File</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>New Tab</Text>
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Text>New Window</Text>
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <Text>New Incognito Window</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Text>Share</Text>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Text>Email link</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Messages</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Notes</Text>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Text>Print...</Text>
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value='edit'>
        <MenubarTrigger>
          <Text>Edit</Text>
        </MenubarTrigger>
        <MenubarContent className='native:w-48'>
          <MenubarItem>
            <Text>Undo</Text>
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Text>Redo</Text>
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Text>Find</Text>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Text>Search the web</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Find...</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Find Next</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>Find Previous</Text>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Text>Cut</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Copy</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Paste</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value='view'>
        <MenubarTrigger>
          <Text>View</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem closeOnPress={false}>
            <Text>Always Show Bookmarks Bar</Text>
          </MenubarCheckboxItem>
          <MenubarCheckboxItem closeOnPress={false}>
            <Text>Always Show Full URLs</Text>
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Reload</Text>
            <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            <Text>Force Reload</Text>
            <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Toggle Fullscreen</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Hide Sidebar</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value='profile'>
        <MenubarTrigger>
          <Text>Profiles</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup>
            <MenubarRadioItem closeOnPress={false} value='andy'>
              <Text>Andy</Text>
            </MenubarRadioItem>
            <MenubarRadioItem closeOnPress={false} value='michael'>
              <Text>Michael</Text>
            </MenubarRadioItem>
            <MenubarRadioItem closeOnPress={false} value='creed'>
              <Text>Creed</Text>
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Edit...</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            <Text>Add Profile...</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
