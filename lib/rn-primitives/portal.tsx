import React from 'react';
import { create } from 'zustand';

type PortalMap = Map<string, React.ReactNode>;

const usePortal = create<{ map: PortalMap }>(() => ({
  map: new Map(),
}));

const updatePortal = (name: string, children: React.ReactNode) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    next.set(name, children);
    return { map: next };
  });
};
const removePortal = (name: string) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    next.delete(name);
    return { map: next };
  });
};

export function PortalProvider() {
  const portalMap = usePortal((state) => state.map);
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
}

export function Portal({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    updatePortal(name, children);
  }, [children, name]);

  React.useEffect(() => {
    return () => {
      removePortal(name);
    };
  }, [name]);

  return null;
}
