import { cssInterop } from 'nativewind';

type Component = Parameters<typeof cssInterop>[0];

export function addCn(components: Component[]) {
  for (const component of components) {
    cssInterop(component, {
      className: 'style',
    });
  }
}
