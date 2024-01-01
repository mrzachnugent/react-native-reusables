export type PropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };
