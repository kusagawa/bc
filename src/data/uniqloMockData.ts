import type {
  UniqloProduct,
  UniqloFixture,
  UniqloFloorPlan,
  UniqloStore,
  UniqloInventoryPlan,
  UniqloWeeklySales,
  UniqloCategorySales,
} from '../types/uniqlo';

export const uniqloStores: UniqloStore[] = [
  { id: 'uq-store-1', name: 'UNIQLO 銀座店', code: 'UQ-TK001', area: '東京', format: '大型店', salesArea: 4500 },
  { id: 'uq-store-2', name: 'UNIQLO 新宿三丁目店', code: 'UQ-TK002', area: '東京', format: '都心型', salesArea: 2200 },
  { id: 'uq-store-3', name: 'UNIQLO ららぽーと横浜店', code: 'UQ-KN001', area: '神奈川', format: '標準店', salesArea: 1800 },
  { id: 'uq-store-4', name: 'UNIQLO イオンモール幕張店', code: 'UQ-CB001', area: '千葉', format: 'ロードサイド', salesArea: 2500 },
  { id: 'uq-store-5', name: 'UNIQLO 心斎橋店', code: 'UQ-OS001', area: '大阪', format: '大型店', salesArea: 3800 },
];

export const uniqloProducts: UniqloProduct[] = [
  // メンズ - トップス
  { id: 'uq-p-001', skuCode: 'UQ-M-001-BK-M', name: 'エアリズムコットンオーバーサイズTシャツ', category: 'トップス', subCategory: 'Tシャツ', gender: 'メンズ', price: 1500, cost: 600, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 850, stockDays: 5, currentStock: 120, safetyStock: 30, leadTimeDays: 7 },
  { id: 'uq-p-002', skuCode: 'UQ-M-002-WH-M', name: 'スーピマコットンクルーネックT', category: 'トップス', subCategory: 'Tシャツ', gender: 'メンズ', price: 1500, cost: 600, size: 'M', color: '#FFFFFF', colorCode: 'ホワイト', salesVolume: 720, stockDays: 5, currentStock: 95, safetyStock: 25, leadTimeDays: 7 },
  { id: 'uq-p-003', skuCode: 'UQ-M-003-NV-L', name: 'オックスフォードシャツ', category: 'トップス', subCategory: 'シャツ', gender: 'メンズ', price: 2990, cost: 1196, size: 'L', color: '#1B3A5C', colorCode: 'ネイビー', salesVolume: 420, stockDays: 10, currentStock: 80, safetyStock: 20, leadTimeDays: 14 },
  { id: 'uq-p-004', skuCode: 'UQ-M-004-GR-M', name: 'ウルトラライトダウンジャケット', category: 'アウター', subCategory: 'ダウン', gender: 'メンズ', price: 6990, cost: 2796, size: 'M', color: '#4A4A4A', colorCode: 'ダークグレー', salesVolume: 280, stockDays: 14, currentStock: 150, safetyStock: 40, leadTimeDays: 21 },
  { id: 'uq-p-005', skuCode: 'UQ-M-005-BL-M', name: 'フリースフルジップジャケット', category: 'アウター', subCategory: 'フリース', gender: 'メンズ', price: 2990, cost: 1196, size: 'M', color: '#2563EB', colorCode: 'ブルー', salesVolume: 380, stockDays: 10, currentStock: 60, safetyStock: 20, leadTimeDays: 14 },

  // メンズ - ボトムス
  { id: 'uq-p-006', skuCode: 'UQ-M-006-NV-32', name: 'スリムフィットチノパンツ', category: 'ボトムス', subCategory: 'チノパンツ', gender: 'メンズ', price: 3990, cost: 1596, size: '32', color: '#2C3E50', colorCode: 'ネイビー', salesVolume: 350, stockDays: 12, currentStock: 70, safetyStock: 15, leadTimeDays: 14 },
  { id: 'uq-p-007', skuCode: 'UQ-M-007-BL-32', name: 'ウルトラストレッチジーンズ', category: 'ボトムス', subCategory: 'ジーンズ', gender: 'メンズ', price: 3990, cost: 1596, size: '32', color: '#1E3A5F', colorCode: 'ブルー', salesVolume: 480, stockDays: 10, currentStock: 85, safetyStock: 20, leadTimeDays: 14 },
  { id: 'uq-p-008', skuCode: 'UQ-M-008-BK-M', name: 'ドライEXショートパンツ', category: 'ボトムス', subCategory: 'ショートパンツ', gender: 'メンズ', price: 1990, cost: 796, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 300, stockDays: 7, currentStock: 45, safetyStock: 10, leadTimeDays: 7 },

  // メンズ - インナー
  { id: 'uq-p-009', skuCode: 'UQ-M-009-BK-M', name: 'ヒートテックインナー', category: 'インナー', subCategory: 'ヒートテック', gender: 'メンズ', price: 1290, cost: 516, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 1200, stockDays: 4, currentStock: 200, safetyStock: 50, leadTimeDays: 7 },
  { id: 'uq-p-010', skuCode: 'UQ-M-010-WH-M', name: 'エアリズムメッシュインナー', category: 'インナー', subCategory: 'エアリズム', gender: 'メンズ', price: 990, cost: 396, size: 'M', color: '#F5F5F5', colorCode: 'ホワイト', salesVolume: 980, stockDays: 4, currentStock: 180, safetyStock: 45, leadTimeDays: 7 },

  // ウィメンズ
  { id: 'uq-p-011', skuCode: 'UQ-W-001-PK-M', name: 'メリノブレンドリブクルーネック', category: 'トップス', subCategory: 'ニット', gender: 'ウィメンズ', price: 2990, cost: 1196, size: 'M', color: '#FFB6C1', colorCode: 'ピンク', salesVolume: 520, stockDays: 10, currentStock: 75, safetyStock: 20, leadTimeDays: 14 },
  { id: 'uq-p-012', skuCode: 'UQ-W-002-BG-M', name: 'ワッフルクルーネックT', category: 'トップス', subCategory: 'Tシャツ', gender: 'ウィメンズ', price: 1500, cost: 600, size: 'M', color: '#F5F0E6', colorCode: 'ベージュ', salesVolume: 680, stockDays: 6, currentStock: 110, safetyStock: 25, leadTimeDays: 7 },
  { id: 'uq-p-013', skuCode: 'UQ-W-003-NV-M', name: 'ウルトラライトダウンコンパクトジャケット', category: 'アウター', subCategory: 'ダウン', gender: 'ウィメンズ', price: 6990, cost: 2796, size: 'M', color: '#1B3A5C', colorCode: 'ネイビー', salesVolume: 320, stockDays: 14, currentStock: 130, safetyStock: 35, leadTimeDays: 21 },
  { id: 'uq-p-014', skuCode: 'UQ-W-004-BK-M', name: 'スマートアンクルパンツ', category: 'ボトムス', subCategory: 'パンツ', gender: 'ウィメンズ', price: 2990, cost: 1196, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 450, stockDays: 10, currentStock: 65, safetyStock: 15, leadTimeDays: 14 },
  { id: 'uq-p-015', skuCode: 'UQ-W-005-DN-M', name: 'ウルトラストレッチデニムレギンスパンツ', category: 'ボトムス', subCategory: 'ジーンズ', gender: 'ウィメンズ', price: 2990, cost: 1196, size: 'M', color: '#3B5998', colorCode: 'デニムブルー', salesVolume: 540, stockDays: 8, currentStock: 90, safetyStock: 20, leadTimeDays: 14 },
  { id: 'uq-p-016', skuCode: 'UQ-W-006-BG-F', name: 'ワンピース リネンブレンド', category: 'ワンピース・スカート', subCategory: 'ワンピース', gender: 'ウィメンズ', price: 3990, cost: 1596, size: 'F', color: '#D4C5A9', colorCode: 'ベージュ', salesVolume: 280, stockDays: 12, currentStock: 55, safetyStock: 12, leadTimeDays: 14 },

  // キッズ
  { id: 'uq-p-017', skuCode: 'UQ-K-001-RD-130', name: 'キッズ ドライEX Tシャツ', category: 'トップス', subCategory: 'Tシャツ', gender: 'キッズ', price: 990, cost: 396, size: '130', color: '#E53935', colorCode: 'レッド', salesVolume: 600, stockDays: 5, currentStock: 100, safetyStock: 25, leadTimeDays: 7 },
  { id: 'uq-p-018', skuCode: 'UQ-K-002-BL-140', name: 'キッズ ウルトラストレッチパンツ', category: 'ボトムス', subCategory: 'パンツ', gender: 'キッズ', price: 1990, cost: 796, size: '140', color: '#1565C0', colorCode: 'ブルー', salesVolume: 380, stockDays: 8, currentStock: 70, safetyStock: 15, leadTimeDays: 10 },

  // UT
  { id: 'uq-p-019', skuCode: 'UQ-UT-001-WH-L', name: 'UT グラフィックTシャツ（鬼滅の刃）', category: 'UT', subCategory: 'コラボUT', gender: 'ユニセックス', price: 1500, cost: 600, size: 'L', color: '#FAFAFA', colorCode: 'ホワイト', salesVolume: 950, stockDays: 3, currentStock: 40, safetyStock: 30, leadTimeDays: 7 },
  { id: 'uq-p-020', skuCode: 'UQ-UT-002-BK-M', name: 'UT グラフィックTシャツ（ワンピース）', category: 'UT', subCategory: 'コラボUT', gender: 'ユニセックス', price: 1500, cost: 600, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 880, stockDays: 3, currentStock: 35, safetyStock: 30, leadTimeDays: 7 },

  // スポーツ
  { id: 'uq-p-021', skuCode: 'UQ-SP-001-BK-M', name: 'ドライEXクルーネックT', category: 'スポーツ', subCategory: 'スポーツトップス', gender: 'メンズ', price: 1500, cost: 600, size: 'M', color: '#1a1a1a', colorCode: 'ブラック', salesVolume: 420, stockDays: 6, currentStock: 80, safetyStock: 20, leadTimeDays: 7 },
  { id: 'uq-p-022', skuCode: 'UQ-SP-002-GR-M', name: 'ウルトラストレッチアクティブジョガーパンツ', category: 'スポーツ', subCategory: 'スポーツボトムス', gender: 'メンズ', price: 2990, cost: 1196, size: 'M', color: '#757575', colorCode: 'グレー', salesVolume: 350, stockDays: 8, currentStock: 65, safetyStock: 15, leadTimeDays: 10 },
];

export const uniqloFixtures: UniqloFixture[] = [
  { id: 'uq-f-001', name: 'メンズTシャツテーブル', type: 'テーブル', width: 1200, height: 900, depth: 800, capacity: 80, productIds: ['uq-p-001', 'uq-p-002'], category: 'トップス', storeId: 'uq-store-1' },
  { id: 'uq-f-002', name: 'メンズシャツハンガー', type: 'ハンガー', width: 1200, height: 1800, depth: 600, capacity: 40, productIds: ['uq-p-003'], category: 'トップス', storeId: 'uq-store-1' },
  { id: 'uq-f-003', name: 'メンズアウターラック', type: 'ラック', width: 1500, height: 1800, depth: 600, capacity: 30, productIds: ['uq-p-004', 'uq-p-005'], category: 'アウター', storeId: 'uq-store-1' },
  { id: 'uq-f-004', name: 'メンズボトムスシェルフ', type: 'シェルフ', width: 1200, height: 1500, depth: 500, capacity: 60, productIds: ['uq-p-006', 'uq-p-007', 'uq-p-008'], category: 'ボトムス', storeId: 'uq-store-1' },
  { id: 'uq-f-005', name: 'ヒートテック壁面', type: '壁面', width: 2400, height: 2100, depth: 400, capacity: 200, productIds: ['uq-p-009', 'uq-p-010'], category: 'インナー', storeId: 'uq-store-1' },
  { id: 'uq-f-006', name: 'ウィメンズニットテーブル', type: 'テーブル', width: 1200, height: 900, depth: 800, capacity: 60, productIds: ['uq-p-011', 'uq-p-012'], category: 'トップス', storeId: 'uq-store-1' },
  { id: 'uq-f-007', name: 'ウィメンズアウターハンガー', type: 'ハンガー', width: 1500, height: 1800, depth: 600, capacity: 25, productIds: ['uq-p-013'], category: 'アウター', storeId: 'uq-store-1' },
  { id: 'uq-f-008', name: 'エントランスマネキン', type: 'マネキン', width: 600, height: 1800, depth: 600, capacity: 1, productIds: [], category: 'ディスプレイ', storeId: 'uq-store-1' },
];

export const uniqloFloorPlans: UniqloFloorPlan[] = [
  {
    id: 'uq-fp-001',
    name: 'UNIQLO 銀座店 1F レイアウト',
    storeId: 'uq-store-1',
    width: 1400,
    height: 900,
    lastModified: '2026-02-20',
    season: '2026 春夏',
    status: '仮確定',
    areas: [
      { id: 'uq-fa-1', name: 'エントランス', x: 550, y: 800, width: 300, height: 80, category: 'エントランス', color: '#E0E0E0', fixtureIds: ['uq-f-008'], rotation: 0 },
      { id: 'uq-fa-2', name: 'メンズ トップス', x: 50, y: 50, width: 300, height: 250, category: 'メンズ', color: '#BBDEFB', fixtureIds: ['uq-f-001', 'uq-f-002'], rotation: 0 },
      { id: 'uq-fa-3', name: 'メンズ ボトムス', x: 50, y: 340, width: 300, height: 200, category: 'メンズ', color: '#90CAF9', fixtureIds: ['uq-f-004'], rotation: 0 },
      { id: 'uq-fa-4', name: 'メンズ アウター', x: 50, y: 580, width: 300, height: 180, category: 'メンズ', color: '#64B5F6', fixtureIds: ['uq-f-003'], rotation: 0 },
      { id: 'uq-fa-5', name: 'ウィメンズ トップス', x: 400, y: 50, width: 300, height: 250, category: 'ウィメンズ', color: '#F8BBD0', fixtureIds: ['uq-f-006'], rotation: 0 },
      { id: 'uq-fa-6', name: 'ウィメンズ ボトムス', x: 400, y: 340, width: 300, height: 200, category: 'ウィメンズ', color: '#F48FB1', fixtureIds: [], rotation: 0 },
      { id: 'uq-fa-7', name: 'ウィメンズ アウター', x: 400, y: 580, width: 300, height: 180, category: 'ウィメンズ', color: '#EC407A', fixtureIds: ['uq-f-007'], rotation: 0 },
      { id: 'uq-fa-8', name: 'UT コーナー', x: 750, y: 50, width: 300, height: 200, category: 'UT', color: '#FFF9C4', fixtureIds: [], rotation: 0 },
      { id: 'uq-fa-9', name: 'キッズ', x: 750, y: 290, width: 300, height: 200, category: 'キッズ', color: '#C8E6C9', fixtureIds: [], rotation: 0 },
      { id: 'uq-fa-10', name: 'インナー・ヒートテック', x: 750, y: 530, width: 300, height: 230, category: 'インナー', color: '#E1BEE7', fixtureIds: ['uq-f-005'], rotation: 0 },
      { id: 'uq-fa-11', name: 'スポーツ', x: 1100, y: 50, width: 250, height: 300, category: 'スポーツ', color: '#B2EBF2', fixtureIds: [], rotation: 0 },
      { id: 'uq-fa-12', name: 'レジ', x: 1100, y: 400, width: 250, height: 100, category: 'レジ', color: '#D1C4E9', fixtureIds: [], rotation: 0 },
      { id: 'uq-fa-13', name: 'フィッティングルーム', x: 1100, y: 540, width: 250, height: 220, category: 'フィッティング', color: '#CFD8DC', fixtureIds: [], rotation: 0 },
    ],
  },
];

export const uniqloInventoryPlans: UniqloInventoryPlan[] = [
  {
    id: 'uq-inv-001',
    storeId: 'uq-store-1',
    season: '2026 春夏',
    category: '全カテゴリ',
    lastModified: '2026-03-01',
    status: '承認待ち',
    items: uniqloProducts.map((p, i) => ({
      id: `uq-inv-item-${i + 1}`,
      productId: p.id,
      product: p,
      currentStock: p.currentStock,
      safetyStock: p.safetyStock,
      weeklyDemand: Math.round(p.salesVolume / 4),
      orderQuantity: Math.round(p.salesVolume / 4 * 2),
      reorderPoint: p.safetyStock + Math.round(p.salesVolume / 4 * (p.leadTimeDays / 7)),
      maxStock: p.safetyStock * 4,
      lastOrderDate: '2026-02-25',
      nextDeliveryDate: '2026-03-05',
      stockStatus: p.currentStock < p.safetyStock ? '不足' as const :
                   p.currentStock < p.safetyStock * 1.5 ? '適正' as const :
                   p.currentStock > p.safetyStock * 3 ? '過剰' as const : '適正' as const,
    })),
  },
];

export const uniqloWeeklySales: UniqloWeeklySales[] = [
  { week: '2026/W05', sales: 12500000, quantity: 4200, stockTurnover: 3.2 },
  { week: '2026/W06', sales: 13800000, quantity: 4600, stockTurnover: 3.5 },
  { week: '2026/W07', sales: 11200000, quantity: 3800, stockTurnover: 2.9 },
  { week: '2026/W08', sales: 14500000, quantity: 4900, stockTurnover: 3.8 },
  { week: '2026/W09', sales: 15200000, quantity: 5100, stockTurnover: 4.0 },
  { week: '2026/W10', sales: 13900000, quantity: 4700, stockTurnover: 3.6 },
];

export const uniqloCategorySales: UniqloCategorySales[] = [
  { category: 'トップス', sales: 8500000, profit: 3400000, quantity: 5200, stockValue: 4200000, turnoverDays: 15 },
  { category: 'ボトムス', sales: 6200000, profit: 2480000, quantity: 2800, stockValue: 3100000, turnoverDays: 18 },
  { category: 'アウター', sales: 5800000, profit: 2320000, quantity: 1200, stockValue: 5500000, turnoverDays: 28 },
  { category: 'インナー', sales: 4500000, profit: 1800000, quantity: 4800, stockValue: 1800000, turnoverDays: 8 },
  { category: 'UT', sales: 3200000, profit: 1920000, quantity: 3500, stockValue: 1200000, turnoverDays: 6 },
  { category: 'キッズ', sales: 2800000, profit: 1120000, quantity: 2200, stockValue: 1500000, turnoverDays: 16 },
  { category: 'スポーツ', sales: 2400000, profit: 960000, quantity: 1800, stockValue: 1100000, turnoverDays: 14 },
  { category: 'ワンピース・スカート', sales: 1800000, profit: 720000, quantity: 800, stockValue: 900000, turnoverDays: 20 },
];
