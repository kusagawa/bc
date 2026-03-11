import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UniqloProduct, UniqloFixture, UniqloFloorPlan, UniqloStore, UniqloInventoryPlan, UniqloWeeklySales, UniqloCategorySales } from '../types/uniqlo';
import {
  uniqloProducts as initialProducts,
  uniqloFixtures as initialFixtures,
  uniqloFloorPlans as initialFloorPlans,
  uniqloStores as initialStores,
  uniqloInventoryPlans as initialInventoryPlans,
  uniqloWeeklySales as initialWeeklySales,
  uniqloCategorySales as initialCategorySales,
} from '../data/uniqloMockData';

interface UniqloState {
  products: UniqloProduct[];
  fixtures: UniqloFixture[];
  floorPlans: UniqloFloorPlan[];
  stores: UniqloStore[];
  inventoryPlans: UniqloInventoryPlan[];
  weeklySales: UniqloWeeklySales[];
  categorySales: UniqloCategorySales[];
  selectedStoreId: string;
  setSelectedStoreId: (id: string) => void;
  updateFloorPlan: (plan: UniqloFloorPlan) => void;
  updateInventoryPlan: (plan: UniqloInventoryPlan) => void;
  addProduct: (product: UniqloProduct) => void;
  updateProduct: (product: UniqloProduct) => void;
  deleteProduct: (id: string) => void;
}

const UniqloContext = createContext<UniqloState | null>(null);

export function UniqloProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<UniqloProduct[]>(initialProducts);
  const [fixtures] = useState<UniqloFixture[]>(initialFixtures);
  const [floorPlans, setFloorPlans] = useState<UniqloFloorPlan[]>(initialFloorPlans);
  const [stores] = useState<UniqloStore[]>(initialStores);
  const [inventoryPlans, setInventoryPlans] = useState<UniqloInventoryPlan[]>(initialInventoryPlans);
  const [weeklySales] = useState<UniqloWeeklySales[]>(initialWeeklySales);
  const [categorySales] = useState<UniqloCategorySales[]>(initialCategorySales);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('uq-store-1');

  const updateFloorPlan = (plan: UniqloFloorPlan) => {
    setFloorPlans(prev => prev.map(fp => fp.id === plan.id ? plan : fp));
  };

  const updateInventoryPlan = (plan: UniqloInventoryPlan) => {
    setInventoryPlans(prev => prev.map(ip => ip.id === plan.id ? plan : ip));
  };

  const addProduct = (product: UniqloProduct) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: UniqloProduct) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <UniqloContext.Provider value={{
      products,
      fixtures,
      floorPlans,
      stores,
      inventoryPlans,
      weeklySales,
      categorySales,
      selectedStoreId,
      setSelectedStoreId,
      updateFloorPlan,
      updateInventoryPlan,
      addProduct,
      updateProduct,
      deleteProduct,
    }}>
      {children}
    </UniqloContext.Provider>
  );
}

export function useUniqloContext() {
  const ctx = useContext(UniqloContext);
  if (!ctx) throw new Error('useUniqloContext must be used within UniqloProvider');
  return ctx;
}
