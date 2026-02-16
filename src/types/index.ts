export interface Product {
  id: string;
  janCode: string;
  name: string;
  category: string;
  subCategory: string;
  maker: string;
  price: number;
  cost: number;
  width: number;  // mm
  height: number; // mm
  depth: number;  // mm
  color: string;
  imageUrl?: string;
  salesVolume: number; // 月間販売数
  stockDays: number;
}

export interface ShelfProduct {
  id: string;
  productId: string;
  product: Product;
  x: number;
  y: number;
  facing: number; // フェイス数
  stacking: number; // 段積み数
}

export interface Shelf {
  id: string;
  shelfNumber: number;
  height: number; // mm
  width: number;  // mm
  depth: number;  // mm
  y: number;      // 棚板のY位置
  products: ShelfProduct[];
}

export interface Gondola {
  id: string;
  name: string;
  width: number;  // mm
  height: number; // mm
  depth: number;  // mm
  shelves: Shelf[];
  category: string;
  storeId: string;
  lastModified: string;
  status: '作成中' | '仮確定' | '確定';
}

export interface FloorArea {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  category: string;
  color: string;
  gondolaIds: string[];
  rotation: number;
}

export interface FloorPlan {
  id: string;
  name: string;
  storeId: string;
  width: number;
  height: number;
  areas: FloorArea[];
  lastModified: string;
}

export interface Store {
  id: string;
  name: string;
  code: string;
  area: string;
  format: string;
  salesArea: number; // 売場面積 m²
}

export interface SalesData {
  productId: string;
  storeId: string;
  date: string;
  quantity: number;
  amount: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  profit: number;
  quantity: number;
  sharePercent: number;
}

export interface MonthlySales {
  month: string;
  sales: number;
  profit: number;
  target: number;
}

export interface DashboardStats {
  totalSales: number;
  totalProfit: number;
  profitRate: number;
  storeCount: number;
  gondolaCount: number;
  productCount: number;
  pendingPlanograms: number;
  confirmedPlanograms: number;
}
