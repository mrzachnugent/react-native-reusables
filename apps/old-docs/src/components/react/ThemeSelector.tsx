import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ExternalLink, Moon, Sun } from 'lucide-react';
import * as React from 'react';

const LOCAL_STORAGE_KEY = 'starlight-theme';

function getPreferredTheme() {
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getTheme() {
  let localStorageTheme =
    typeof localStorage !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_KEY);
  if (
    localStorageTheme === 'auto' ||
    (localStorageTheme !== 'dark' && localStorageTheme !== 'light')
  ) {
    localStorageTheme = getPreferredTheme();
  }
  return localStorageTheme;
}

export function ThemeSelector() {
  const [theme, setTheme] = React.useState('dark');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTheme(getTheme());
    setMounted(true);
  }, []);

  function handleThemeChange(radioValue: string) {
    setTheme(radioValue);
    const newTheme = radioValue === 'auto' ? getPreferredTheme() : radioValue;
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
  }

  return (
    <div className='flex items-center space-x-2'>
      <Button
        size='sm'
        variant='ghost'
        className={cn(!mounted && 'opacity-0', 'bg-secondary hover:bg-background gap-1.5')}
        asChild
      >
        <a
          href='https://rnr-showcase.vercel.app/'
          target='_blank'
          className='text-foreground no-underline'
        >
          Demo <ExternalLink size={15} />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='sm'
            variant='ghost'
            className={cn(
              !mounted && 'opacity-0',
              'text-foreground bg-secondary hover:bg-background'
            )}
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
            <DropdownMenuRadioItem value='auto'>Auto</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
