import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fixImports(rawfile: string) {
  return rawfile
    .replace('../Icons', '~/components/Icons')
    .replace('../../lib', '~/lib')
    .replace('../../components', '~/components');
}
