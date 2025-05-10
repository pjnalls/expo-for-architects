import { createContext, useContext, useState, ReactNode } from 'react';
import { CatFact } from '@/types/Cat';

type CatFactContextType = {
  catFact: CatFact | undefined;
  setCatFact: (catFact: CatFact | undefined) => void;
};

const CatFactContext = createContext<CatFactContextType | undefined>(undefined);

export function CatFactProvider({ children }: { children: ReactNode }) {
  const [catFact, setCatFact] = useState<CatFact | undefined>(undefined);

  return (
    <CatFactContext.Provider value={{ catFact, setCatFact }}>
      {children}
    </CatFactContext.Provider>
  );
}

export function useCatFact() {
  const context = useContext(CatFactContext);
  if (context === undefined) {
    throw new Error('useCatFact must be used within a CatFactProvider');
  }
  return context;
} 