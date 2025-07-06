import * as React from 'react';

type Style = 'default' | 'new-york';

const StyleContext = React.createContext<{
  style: Style;
  setStyle: React.Dispatch<React.SetStateAction<Style>>;
} | null>(null);

function StyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = React.useState<Style>('default');

  return <StyleContext.Provider value={{ style, setStyle }}>{children}</StyleContext.Provider>;
}

function useStyle() {
  const context = React.useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}

function withStyleToggle<TProps>(
  DefaultComponent: React.ComponentType<TProps>,
  NewYorkComponent: React.ComponentType<TProps>
) {
  return function StyledComponent(props: TProps) {
    const { style } = useStyle();
    const Component = style === 'new-york' ? NewYorkComponent : DefaultComponent;
    return <Component {...props} />;
  };
}

export { StyleProvider, useStyle, withStyleToggle };
