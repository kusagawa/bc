export interface UniqloProduct {
  id: string;
  skuCode: string;
  name: string;
  category: string;
  subCategory: string;
  gender: 'メンズ' | 'ウィメンズ' | 'キッズ' | 'ベビー' | 'ユニセックス';
  price: number;
  cost: number;
  size: string;
  color: string;
  colorCode: string;
  imageUrl?: string;
  salesVolume: number;
  stockDays: number;
  currentStock: number;
  safetyStock: number;
  leadTimeDays: number;
}

export interface UniqloFixture {
  id: string;
  name: string;
  type: 'テーブル' | 'ラック' | 'ハンガー' | 'シェルフ' | '壁面' | 'マネキン';
  width: number;
  height: number;
  depth: number;
  capacity: number;
  productIds: string[];
  category: string;
  storeId: string;
}

export interface UniqloFloorArea {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  category: string;
  color: string;
  fixtureIds: string[];
  rotation: number;
}

export interface UniqloFloorPlan {
  id: string;
  name: string;
  storeId: string;
  width: number;
  height: number;
  areas: UniqloFloorArea[];
  lastModified: string;
  season: string;
  status: '作成中' | '仮確定' | '確定';
}

export interface UniqloStore {
  id: string;
  name: string;
  code: string;
  area: string;
  format: '標準店' | '大型店' | 'ロードサイド' | '都心型';
  salesArea: number;
}

export interface UniqloInventoryPlan {
  id: string;
  storeId: string;
  season: string;
  category: string;
  items: UniqloInventoryItem[];
  lastModified: string;
  status: '作成中' | '承認待ち' | '承認済';
}

export interface UniqloInventoryItem {
  id: string;
  productId: string;
  product: UniqloProduct;
  currentStock: number;
  safetyStock: number;
  weeklyDemand: number;
  orderQuantity: number;
  reorderPoint: number;
  maxStock: number;
  lastOrderDate: string;
  nextDeliveryDate: string;
  stockStatus: '適正' | '過剰' | '不足' | '欠品';
}

export interface UniqloWeeklySales {
  week: string;
  sales: number;
  quantity: number;
  stockTurnover: number;
}

export interface UniqloCategorySales {
  category: string;
  sales: number;
  profit: number;
  quantity: number;
  stockValue: number;
  turnoverDays: number;
}
