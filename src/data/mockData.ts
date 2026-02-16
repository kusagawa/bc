import type { Product, Gondola, FloorPlan, Store, CategorySales, MonthlySales, DashboardStats } from '../types';

export const stores: Store[] = [
  { id: 'store-1', name: '渋谷中央店', code: 'TK001', area: '東京', format: 'GMS', salesArea: 2500 },
  { id: 'store-2', name: '新宿南口店', code: 'TK002', area: '東京', format: 'SM', salesArea: 1800 },
  { id: 'store-3', name: '横浜港北店', code: 'KN001', area: '神奈川', format: 'GMS', salesArea: 3200 },
  { id: 'store-4', name: '大宮駅前店', code: 'ST001', area: '埼玉', format: 'SM', salesArea: 1500 },
  { id: 'store-5', name: '千葉幕張店', code: 'CB001', area: '千葉', format: 'GMS', salesArea: 2800 },
];

export const products: Product[] = [
  // 飲料
  { id: 'p-001', janCode: '4901234567890', name: '天然水 550ml', category: '飲料', subCategory: 'ミネラルウォーター', maker: 'サントリー', price: 110, cost: 72, width: 65, height: 210, depth: 65, color: '#87CEEB', salesVolume: 480, stockDays: 3 },
  { id: 'p-002', janCode: '4901234567891', name: 'お～いお茶 525ml', category: '飲料', subCategory: '緑茶', maker: '伊藤園', price: 150, cost: 98, width: 68, height: 215, depth: 68, color: '#90EE90', salesVolume: 360, stockDays: 4 },
  { id: 'p-003', janCode: '4901234567892', name: 'コカ・コーラ 500ml', category: '飲料', subCategory: '炭酸飲料', maker: 'コカ・コーラ', price: 160, cost: 104, width: 68, height: 220, depth: 68, color: '#FF6B6B', salesVolume: 320, stockDays: 3 },
  { id: 'p-004', janCode: '4901234567893', name: 'BOSS 185g', category: '飲料', subCategory: 'コーヒー', maker: 'サントリー', price: 130, cost: 85, width: 55, height: 130, depth: 55, color: '#8B4513', salesVolume: 290, stockDays: 5 },
  { id: 'p-005', janCode: '4901234567894', name: '午後の紅茶ミルクティー 500ml', category: '飲料', subCategory: '紅茶', maker: 'キリン', price: 160, cost: 104, width: 68, height: 215, depth: 68, color: '#DEB887', salesVolume: 250, stockDays: 4 },
  { id: 'p-006', janCode: '4901234567895', name: 'アクエリアス 500ml', category: '飲料', subCategory: 'スポーツ飲料', maker: 'コカ・コーラ', price: 160, cost: 104, width: 68, height: 220, depth: 68, color: '#4FC3F7', salesVolume: 200, stockDays: 5 },
  { id: 'p-007', janCode: '4901234567896', name: '生茶 525ml', category: '飲料', subCategory: '緑茶', maker: 'キリン', price: 150, cost: 98, width: 68, height: 215, depth: 68, color: '#81C784', salesVolume: 220, stockDays: 4 },
  { id: 'p-008', janCode: '4901234567897', name: 'デカビタC 210ml', category: '飲料', subCategory: 'エナジー', maker: 'サントリー', price: 120, cost: 78, width: 55, height: 160, depth: 55, color: '#FFD54F', salesVolume: 180, stockDays: 6 },

  // 菓子
  { id: 'p-009', janCode: '4901234567900', name: 'ポテトチップス うすしお 60g', category: '菓子', subCategory: 'スナック', maker: 'カルビー', price: 150, cost: 98, width: 200, height: 280, depth: 60, color: '#FFE082', salesVolume: 400, stockDays: 7 },
  { id: 'p-010', janCode: '4901234567901', name: 'じゃがりこ サラダ', category: '菓子', subCategory: 'スナック', maker: 'カルビー', price: 160, cost: 104, width: 75, height: 120, depth: 75, color: '#A5D6A7', salesVolume: 350, stockDays: 7 },
  { id: 'p-011', janCode: '4901234567902', name: 'チョコレート効果 72%', category: '菓子', subCategory: 'チョコレート', maker: '明治', price: 230, cost: 150, width: 140, height: 180, depth: 30, color: '#795548', salesVolume: 280, stockDays: 10 },
  { id: 'p-012', janCode: '4901234567903', name: 'キットカット ミニ 12枚', category: '菓子', subCategory: 'チョコレート', maker: 'ネスレ', price: 350, cost: 228, width: 160, height: 200, depth: 40, color: '#E53935', salesVolume: 200, stockDays: 10 },
  { id: 'p-013', janCode: '4901234567904', name: 'かっぱえびせん 85g', category: '菓子', subCategory: 'スナック', maker: 'カルビー', price: 140, cost: 91, width: 180, height: 260, depth: 55, color: '#FFAB91', salesVolume: 260, stockDays: 7 },
  { id: 'p-014', janCode: '4901234567905', name: 'アーモンドチョコレート', category: '菓子', subCategory: 'チョコレート', maker: '明治', price: 250, cost: 163, width: 140, height: 190, depth: 35, color: '#A1887F', salesVolume: 190, stockDays: 10 },

  // 日用品
  { id: 'p-015', janCode: '4901234567910', name: 'アタックZERO 本体', category: '日用品', subCategory: '洗濯洗剤', maker: '花王', price: 398, cost: 259, width: 110, height: 230, depth: 65, color: '#42A5F5', salesVolume: 150, stockDays: 14 },
  { id: 'p-016', janCode: '4901234567911', name: 'ジョイ 本体', category: '日用品', subCategory: '食器用洗剤', maker: 'P&G', price: 198, cost: 129, width: 80, height: 200, depth: 45, color: '#66BB6A', salesVolume: 200, stockDays: 14 },
  { id: 'p-017', janCode: '4901234567912', name: 'トイレマジックリン', category: '日用品', subCategory: 'トイレ用洗剤', maker: '花王', price: 298, cost: 194, width: 100, height: 240, depth: 60, color: '#AB47BC', salesVolume: 120, stockDays: 21 },
  { id: 'p-018', janCode: '4901234567913', name: 'エリエール ティッシュ 5箱', category: '日用品', subCategory: 'ティッシュ', maker: '大王製紙', price: 350, cost: 228, width: 240, height: 120, depth: 350, color: '#FFEE58', salesVolume: 180, stockDays: 10 },
  { id: 'p-019', janCode: '4901234567914', name: 'クイックルワイパー 本体', category: '日用品', subCategory: '掃除用品', maker: '花王', price: 980, cost: 637, width: 280, height: 70, depth: 120, color: '#26A69A', salesVolume: 60, stockDays: 30 },
  { id: 'p-020', janCode: '4901234567915', name: 'ファブリーズ 370ml', category: '日用品', subCategory: '消臭剤', maker: 'P&G', price: 398, cost: 259, width: 90, height: 230, depth: 60, color: '#5C6BC0', salesVolume: 100, stockDays: 21 },

  // 食品
  { id: 'p-021', janCode: '4901234567920', name: 'カップヌードル', category: '食品', subCategory: 'カップ麺', maker: '日清', price: 210, cost: 137, width: 100, height: 105, depth: 100, color: '#FF7043', salesVolume: 500, stockDays: 7 },
  { id: 'p-022', janCode: '4901234567921', name: 'どん兵衛 きつねうどん', category: '食品', subCategory: 'カップ麺', maker: '日清', price: 210, cost: 137, width: 165, height: 85, depth: 165, color: '#FFA726', salesVolume: 380, stockDays: 7 },
  { id: 'p-023', janCode: '4901234567922', name: 'ごはんですよ！', category: '食品', subCategory: '瓶詰', maker: '桃屋', price: 298, cost: 194, width: 70, height: 120, depth: 70, color: '#4E342E', salesVolume: 150, stockDays: 14 },
  { id: 'p-024', janCode: '4901234567923', name: 'ふりかけ のりたま', category: '食品', subCategory: 'ふりかけ', maker: '丸美屋', price: 180, cost: 117, width: 100, height: 170, depth: 20, color: '#FDD835', salesVolume: 200, stockDays: 14 },
  { id: 'p-025', janCode: '4901234567924', name: 'クノール カップスープ 8袋', category: '食品', subCategory: 'スープ', maker: '味の素', price: 380, cost: 247, width: 160, height: 200, depth: 45, color: '#FFCA28', salesVolume: 170, stockDays: 14 },
  { id: 'p-026', janCode: '4901234567925', name: 'マルちゃん 焼そば 3食入', category: '食品', subCategory: '生麺', maker: '東洋水産', price: 250, cost: 163, width: 200, height: 60, depth: 120, color: '#8D6E63', salesVolume: 220, stockDays: 5 },
];

export const gondolas: Gondola[] = [
  {
    id: 'g-001',
    name: '飲料ゴンドラA（緑茶・水）',
    width: 900,
    height: 1800,
    depth: 450,
    category: '飲料',
    storeId: 'store-1',
    lastModified: '2026-02-15',
    status: '確定',
    shelves: [
      {
        id: 's-001-1', shelfNumber: 1, height: 250, width: 900, depth: 450, y: 0,
        products: [
          { id: 'sp-1', productId: 'p-001', product: null as unknown as Product, x: 0, y: 0, facing: 4, stacking: 2 },
          { id: 'sp-2', productId: 'p-002', product: null as unknown as Product, x: 260, y: 0, facing: 3, stacking: 2 },
        ]
      },
      {
        id: 's-001-2', shelfNumber: 2, height: 250, width: 900, depth: 450, y: 300,
        products: [
          { id: 'sp-3', productId: 'p-005', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 2 },
          { id: 'sp-4', productId: 'p-007', product: null as unknown as Product, x: 210, y: 0, facing: 3, stacking: 2 },
        ]
      },
      {
        id: 's-001-3', shelfNumber: 3, height: 250, width: 900, depth: 450, y: 600,
        products: [
          { id: 'sp-5', productId: 'p-003', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 2 },
          { id: 'sp-6', productId: 'p-006', product: null as unknown as Product, x: 210, y: 0, facing: 3, stacking: 2 },
        ]
      },
      {
        id: 's-001-4', shelfNumber: 4, height: 200, width: 900, depth: 450, y: 900,
        products: [
          { id: 'sp-7', productId: 'p-004', product: null as unknown as Product, x: 0, y: 0, facing: 5, stacking: 3 },
          { id: 'sp-8', productId: 'p-008', product: null as unknown as Product, x: 280, y: 0, facing: 4, stacking: 3 },
        ]
      },
    ]
  },
  {
    id: 'g-002',
    name: '菓子ゴンドラA（スナック）',
    width: 900,
    height: 1800,
    depth: 450,
    category: '菓子',
    storeId: 'store-1',
    lastModified: '2026-02-14',
    status: '仮確定',
    shelves: [
      {
        id: 's-002-1', shelfNumber: 1, height: 300, width: 900, depth: 450, y: 0,
        products: [
          { id: 'sp-9', productId: 'p-009', product: null as unknown as Product, x: 0, y: 0, facing: 2, stacking: 1 },
          { id: 'sp-10', productId: 'p-013', product: null as unknown as Product, x: 400, y: 0, facing: 2, stacking: 1 },
        ]
      },
      {
        id: 's-002-2', shelfNumber: 2, height: 200, width: 900, depth: 450, y: 350,
        products: [
          { id: 'sp-11', productId: 'p-011', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 1 },
          { id: 'sp-12', productId: 'p-014', product: null as unknown as Product, x: 420, y: 0, facing: 3, stacking: 1 },
        ]
      },
      {
        id: 's-002-3', shelfNumber: 3, height: 200, width: 900, depth: 450, y: 600,
        products: [
          { id: 'sp-13', productId: 'p-010', product: null as unknown as Product, x: 0, y: 0, facing: 4, stacking: 2 },
          { id: 'sp-14', productId: 'p-012', product: null as unknown as Product, x: 300, y: 0, facing: 3, stacking: 1 },
        ]
      },
    ]
  },
  {
    id: 'g-003',
    name: '日用品ゴンドラA（洗剤）',
    width: 900,
    height: 1800,
    depth: 450,
    category: '日用品',
    storeId: 'store-1',
    lastModified: '2026-02-13',
    status: '作成中',
    shelves: [
      {
        id: 's-003-1', shelfNumber: 1, height: 300, width: 900, depth: 450, y: 0,
        products: [
          { id: 'sp-15', productId: 'p-015', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 1 },
          { id: 'sp-16', productId: 'p-016', product: null as unknown as Product, x: 330, y: 0, facing: 3, stacking: 1 },
        ]
      },
      {
        id: 's-003-2', shelfNumber: 2, height: 300, width: 900, depth: 450, y: 350,
        products: [
          { id: 'sp-17', productId: 'p-017', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 1 },
          { id: 'sp-18', productId: 'p-020', product: null as unknown as Product, x: 300, y: 0, facing: 3, stacking: 1 },
        ]
      },
      {
        id: 's-003-3', shelfNumber: 3, height: 300, width: 900, depth: 450, y: 700,
        products: [
          { id: 'sp-19', productId: 'p-018', product: null as unknown as Product, x: 0, y: 0, facing: 2, stacking: 1 },
          { id: 'sp-20', productId: 'p-019', product: null as unknown as Product, x: 480, y: 0, facing: 1, stacking: 1 },
        ]
      },
    ]
  },
  {
    id: 'g-004',
    name: '食品ゴンドラA（カップ麺）',
    width: 900,
    height: 1800,
    depth: 450,
    category: '食品',
    storeId: 'store-2',
    lastModified: '2026-02-12',
    status: '確定',
    shelves: [
      {
        id: 's-004-1', shelfNumber: 1, height: 200, width: 900, depth: 450, y: 0,
        products: [
          { id: 'sp-21', productId: 'p-021', product: null as unknown as Product, x: 0, y: 0, facing: 4, stacking: 2 },
          { id: 'sp-22', productId: 'p-022', product: null as unknown as Product, x: 400, y: 0, facing: 2, stacking: 2 },
        ]
      },
      {
        id: 's-004-2', shelfNumber: 2, height: 250, width: 900, depth: 450, y: 250,
        products: [
          { id: 'sp-23', productId: 'p-025', product: null as unknown as Product, x: 0, y: 0, facing: 3, stacking: 1 },
          { id: 'sp-24', productId: 'p-024', product: null as unknown as Product, x: 480, y: 0, facing: 4, stacking: 1 },
        ]
      },
      {
        id: 's-004-3', shelfNumber: 3, height: 200, width: 900, depth: 450, y: 550,
        products: [
          { id: 'sp-25', productId: 'p-023', product: null as unknown as Product, x: 0, y: 0, facing: 4, stacking: 2 },
          { id: 'sp-26', productId: 'p-026', product: null as unknown as Product, x: 280, y: 0, facing: 2, stacking: 1 },
        ]
      },
    ]
  },
];

// Resolve product references in gondolas
gondolas.forEach(g => {
  g.shelves.forEach(s => {
    s.products.forEach(sp => {
      const found = products.find(p => p.id === sp.productId);
      if (found) sp.product = found;
    });
  });
});

export const floorPlans: FloorPlan[] = [
  {
    id: 'fp-001',
    name: '渋谷中央店 1F レイアウト',
    storeId: 'store-1',
    width: 1200,
    height: 800,
    lastModified: '2026-02-15',
    areas: [
      { id: 'fa-1', name: '入口', x: 500, y: 700, width: 200, height: 80, category: '入口', color: '#E0E0E0', gondolaIds: [], rotation: 0 },
      { id: 'fa-2', name: '飲料', x: 50, y: 50, width: 250, height: 300, category: '飲料', color: '#BBDEFB', gondolaIds: ['g-001'], rotation: 0 },
      { id: 'fa-3', name: '菓子', x: 350, y: 50, width: 250, height: 300, category: '菓子', color: '#C8E6C9', gondolaIds: ['g-002'], rotation: 0 },
      { id: 'fa-4', name: '日用品', x: 650, y: 50, width: 250, height: 300, category: '日用品', color: '#F8BBD0', gondolaIds: ['g-003'], rotation: 0 },
      { id: 'fa-5', name: '食品', x: 950, y: 50, width: 200, height: 300, category: '食品', color: '#FFE0B2', gondolaIds: [], rotation: 0 },
      { id: 'fa-6', name: 'レジ', x: 50, y: 650, width: 400, height: 80, category: 'レジ', color: '#D1C4E9', gondolaIds: [], rotation: 0 },
      { id: 'fa-7', name: '青果', x: 50, y: 400, width: 200, height: 200, category: '青果', color: '#DCEDC8', gondolaIds: [], rotation: 0 },
      { id: 'fa-8', name: '精肉', x: 300, y: 400, width: 200, height: 200, category: '精肉', color: '#FFCDD2', gondolaIds: [], rotation: 0 },
      { id: 'fa-9', name: '鮮魚', x: 550, y: 400, width: 200, height: 200, category: '鮮魚', color: '#B3E5FC', gondolaIds: [], rotation: 0 },
      { id: 'fa-10', name: '惣菜', x: 800, y: 400, width: 200, height: 200, category: '惣菜', color: '#FFF9C4', gondolaIds: [], rotation: 0 },
    ]
  }
];

export const categorySales: CategorySales[] = [
  { category: '飲料', sales: 4850000, profit: 1552000, quantity: 32400, sharePercent: 28.5 },
  { category: '菓子', sales: 3200000, profit: 1024000, quantity: 18900, sharePercent: 18.8 },
  { category: '食品', sales: 3650000, profit: 1168000, quantity: 21500, sharePercent: 21.5 },
  { category: '日用品', sales: 2100000, profit: 672000, quantity: 5800, sharePercent: 12.4 },
  { category: '青果', sales: 1500000, profit: 450000, quantity: 9800, sharePercent: 8.8 },
  { category: '精肉', sales: 980000, profit: 294000, quantity: 4200, sharePercent: 5.8 },
  { category: '鮮魚', sales: 720000, profit: 216000, quantity: 2800, sharePercent: 4.2 },
];

export const monthlySales: MonthlySales[] = [
  { month: '2025/09', sales: 15200000, profit: 4864000, target: 14500000 },
  { month: '2025/10', sales: 16800000, profit: 5376000, target: 15000000 },
  { month: '2025/11', sales: 17500000, profit: 5600000, target: 16000000 },
  { month: '2025/12', sales: 21200000, profit: 6784000, target: 19000000 },
  { month: '2026/01', sales: 17000000, profit: 5440000, target: 16500000 },
  { month: '2026/02', sales: 14800000, profit: 4736000, target: 15000000 },
];

export const dashboardStats: DashboardStats = {
  totalSales: 17000000,
  totalProfit: 5440000,
  profitRate: 32.0,
  storeCount: 5,
  gondolaCount: 48,
  productCount: 1250,
  pendingPlanograms: 12,
  confirmedPlanograms: 36,
};
