import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, Gondola, FloorPlan, Store } from '../types';
import { products as initialProducts, gondolas as initialGondolas, floorPlans as initialFloorPlans, stores as initialStores } from '../data/mockData';

interface AppState {
  products: Product[];
  gondolas: Gondola[];
  floorPlans: FloorPlan[];
  stores: Store[];
  selectedStoreId: string;
  setSelectedStoreId: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateGondola: (gondola: Gondola) => void;
  addGondola: (gondola: Gondola) => void;
  deleteGondola: (id: string) => void;
  updateFloorPlan: (plan: FloorPlan) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [gondolas, setGondolas] = useState<Gondola[]>(initialGondolas);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(initialFloorPlans);
  const [stores] = useState<Store[]>(initialStores);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store-1');

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateGondola = (gondola: Gondola) => {
    setGondolas(prev => prev.map(g => g.id === gondola.id ? gondola : g));
  };

  const addGondola = (gondola: Gondola) => {
    setGondolas(prev => [...prev, gondola]);
  };

  const deleteGondola = (id: string) => {
    setGondolas(prev => prev.filter(g => g.id !== id));
  };

  const updateFloorPlan = (plan: FloorPlan) => {
    setFloorPlans(prev => prev.map(fp => fp.id === plan.id ? plan : fp));
  };

  return (
    <AppContext.Provider value={{
      products,
      gondolas,
      floorPlans,
      stores,
      selectedStoreId,
      setSelectedStoreId,
      addProduct,
      updateProduct,
      deleteProduct,
      updateGondola,
      addGondola,
      deleteGondola,
      updateFloorPlan,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
