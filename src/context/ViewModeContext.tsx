// src/context/ViewModeContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type ViewMode = 'fullscreen' | 'grid' | 'list';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: 'fullscreen',
  setViewMode: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('fullscreen');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, isMenuOpen, setIsMenuOpen }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => useContext(ViewModeContext);
