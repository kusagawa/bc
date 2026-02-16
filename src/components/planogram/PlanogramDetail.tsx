import type { Gondola } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PlanogramDetailProps {
  gondola: Gondola;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function PlanogramDetail({ gondola }: PlanogramDetailProps) {
  // Calculate shelf statistics
  const shelfStats = gondola.shelves.map(shelf => {
    const products = shelf.products;
    const totalFacing = products.reduce((sum, sp) => sum + sp.facing, 0);
    const usedWidth = products.reduce((sum, sp) => sum + sp.product.width * sp.facing, 0);
    const utilization = (usedWidth / shelf.width) * 100;
    const totalSales = products.reduce((sum, sp) => sum + sp.product.price * sp.product.salesVolume * sp.facing, 0);
    const totalProfit = products.reduce((sum, sp) => sum + (sp.product.price - sp.product.cost) * sp.product.salesVolume * sp.facing, 0);

    return {
      shelfNumber: shelf.shelfNumber,
      productCount: products.length,
      totalFacing,
      utilization: Math.min(100, utilization),
      usedWidth,
      shelfWidth: shelf.width,
      totalSales,
      totalProfit,
    };
  });

  const totalProducts = shelfStats.reduce((sum, s) => sum + s.productCount, 0);
  const totalFacing = shelfStats.reduce((sum, s) => sum + s.totalFacing, 0);
  const totalSales = shelfStats.reduce((sum, s) => sum + s.totalSales, 0);
  const totalProfit = shelfStats.reduce((sum, s) => sum + s.totalProfit, 0);
  const avgUtilization = shelfStats.length > 0
    ? shelfStats.reduce((sum, s) => sum + s.utilization, 0) / shelfStats.length
    : 0;

  // Product breakdown by maker
  const makerMap = new Map<string, { maker: string; count: number; facing: number; sales: number }>();
  gondola.shelves.forEach(shelf => {
    shelf.products.forEach(sp => {
      const existing = makerMap.get(sp.product.maker) || { maker: sp.product.maker, count: 0, facing: 0, sales: 0 };
      existing.count += 1;
      existing.facing += sp.facing;
      existing.sales += sp.product.price * sp.product.salesVolume * sp.facing;
      makerMap.set(sp.product.maker, existing);
    });
  });
  const makerData = Array.from(makerMap.values()).sort((a, b) => b.sales - a.sales);

  return (
    <div className="w-56 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shrink-0">
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xs font-semibold text-gray-700">棚割分析</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Summary */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase">サマリ</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-md p-2 text-center">
              <div className="text-lg font-bold text-blue-700">{totalProducts}</div>
              <div className="text-[10px] text-blue-500">商品数</div>
            </div>
            <div className="bg-green-50 rounded-md p-2 text-center">
              <div className="text-lg font-bold text-green-700">{totalFacing}</div>
              <div className="text-[10px] text-green-500">総フェイス</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">棚利用率</span>
              <span className="font-medium text-gray-700">{avgUtilization.toFixed(1)}%</span>
            </div>
            <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${avgUtilization}%`,
                  backgroundColor: avgUtilization > 80 ? '#10B981' : avgUtilization > 50 ? '#F59E0B' : '#EF4444',
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">推定月間売上</span>
              <span className="font-medium text-gray-700">¥{(totalSales / 10000).toFixed(0)}万</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">推定月間粗利</span>
              <span className="font-medium text-green-700">¥{(totalProfit / 10000).toFixed(0)}万</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">粗利率</span>
              <span className="font-medium text-gray-700">
                {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Shelf breakdown */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase">段別利用率</h3>
          {shelfStats.map(stat => (
            <div key={stat.shelfNumber} className="space-y-0.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-600">{stat.shelfNumber}段目</span>
                <span className="text-gray-500">{stat.usedWidth}mm / {stat.shelfWidth}mm</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${stat.utilization}%`,
                    backgroundColor: stat.utilization > 80 ? '#10B981' : stat.utilization > 50 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Maker breakdown chart */}
        {makerData.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase">メーカー別売上</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={makerData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="maker" tick={{ fontSize: 9 }} width={55} />
                <Tooltip
                  formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`}
                  contentStyle={{ fontSize: 10 }}
                />
                <Bar dataKey="sales" radius={[0, 3, 3, 0]} barSize={12}>
                  {makerData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Gondola info */}
        <div className="space-y-1.5">
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase">ゴンドラ情報</h3>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">サイズ</span>
              <span className="text-gray-700">{gondola.width}×{gondola.height}×{gondola.depth}mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">段数</span>
              <span className="text-gray-700">{gondola.shelves.length}段</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">カテゴリ</span>
              <span className="text-gray-700">{gondola.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">最終更新</span>
              <span className="text-gray-700">{gondola.lastModified}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
