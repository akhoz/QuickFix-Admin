import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import WorkshopType from '../types/Workshop';

interface WorkshopContextProps {
  workshop: WorkshopType | null;
  setWorkshop: (workshop: WorkshopType) => void;
  clearWorkshop: () => void;
}

interface WorkshopProviderProps {
  children: ReactNode;
}

const WorkshopContext = createContext<WorkshopContextProps | undefined>(undefined);

export const WorkshopProvider: React.FC<WorkshopProviderProps> = ({ children }) => {
  const { storedValue: workshop, setValue: setWorkshop, removeItem: clearWorkshop } = useLocalStorage<WorkshopType | null>('workshop', null);

  return (
    <WorkshopContext.Provider value={{ workshop, setWorkshop, clearWorkshop }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
};
