import { createContext, useContext } from 'react';

export enum ContainerSize {
  COMPACT = 'COMPACT',
  MEDIUM = 'MEDIUM',
  WIDE = 'WIDE',
}

export const SizeContext = createContext<ContainerSize | null>(null);

export const useContainerSize = () => {
  const context = useContext(SizeContext);
  if (!context) {
    throw new Error('useContainerSize must be used within <SizeProvider>');
  }
  return context;
};
