import { storage } from '@showcase/lib/storage';
import * as React from 'react';

type Style = 'default' | 'new-york';

const StyleContext = React.createContext<{
  style: Style;
  setStyle: (style: Style) => void;
} | null>(null);

function StyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyleState] = React.useState<Style>(() => {
    const style = storage.getString('theme.style');
    return style === 'new-york' ? 'new-york' : 'default';
  });

  function setStyle(style: Style) {
    try {
      storage.set('theme.style', style);
      setStyleState(style);
    } catch (error) {
      console.error(error);
    }
  }

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
