import { useState, useMemo } from 'react';
import { useUniqloContext } from '../../store/UniqloContext';
import { Package, AlertTriangle, CheckCircle, TrendingUp, Search, Filter, Save, ArrowUpDown, Truck, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend, PieChart, Pie } from 'recharts';

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '適正': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  '過剰': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  '不足': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  '欠品': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
};

const CHART_COLORS = ['#DC2626', '#EA580C', '#D97706', '#65A30D', '#0891B2', '#7C3AED', '#DB2777', '#4B5563'];

export default function UniqloInventoryPlanner() {
  const { inventoryPlans, products, weeklySales, categorySales, selectedStoreId, updateInventoryPlan } = useUniqloContext();
  const plan = inventoryPlans.find(p => p.storeId === selectedStoreId) || null;

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'currentStock' | 'weeklyDemand' | 'stockStatus'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'analysis'>('list');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const genders = ['all', 'メンズ', 'ウィメンズ', 'キッズ', 'ベビー', 'ユニセックス'];

  const filteredItems = useMemo(() => {
    if (!plan) return [];
    let result = plan.items;
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.product.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
      result = result.filter(item => item.stockStatus === statusFilter);
    }
    if (genderFilter !== 'all') {
      result = result.filter(item => item.product.gender === genderFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        item.product.name.toLowerCase().includes(q) ||
        item.product.skuCode.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name': cmp = a.product.name.localeCompare(b.product.name); break;
        case 'currentStock': cmp = a.currentStock - b.currentStock; break;
        case 'weeklyDemand': cmp = a.weeklyDemand - b.weeklyDemand; break;
        case 'stockStatus': cmp = a.stockStatus.localeCompare(b.stockStatus); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [plan, search, categoryFilter, statusFilter, genderFilter, sortField, sortDir]);

  const selectedItem = plan?.items.find(item => item.id === selectedItemId) || null;

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleUpdateOrderQty = (itemId: string, qty: number) => {
    if (!plan) return;
    const updated = { ...plan };
    updated.items = plan.items.map(item =>
      item.id === itemId ? { ...item, orderQuantity: Math.max(0, qty) } : item
    );
    updated.lastModified = new Date().toISOString().split('T')[0];
    updateInventoryPlan(updated);
  };

  const handleStatusChange = (status: '作成中' | '承認待ち' | '承認済') => {
    if (!plan) return;
    updateInventoryPlan({ ...plan, status, lastModified: new Date().toISOString().split('T')[0] });
  };

  // Summary stats
  const stats = useMemo(() => {
    if (!plan) return { total: 0, adequate: 0, excess: 0, shortage: 0, outOfStock: 0, totalValue: 0, totalOrderValue: 0 };
    const items = plan.items;
    return {
      total: items.length,
      adequate: items.filter(i => i.stockStatus === '適正').length,
      excess: items.filter(i => i.stockStatus === '過剰').length,
      shortage: items.filter(i => i.stockStatus === '不足').length,
      outOfStock: items.filter(i => i.stockStatus === '欠品').length,
      totalValue: items.reduce((sum, i) => sum + i.currentStock * i.product.cost, 0),
      totalOrderValue: items.reduce((sum, i) => sum + i.orderQuantity * i.product.cost, 0),
    };
  }, [plan]);

  // Stock status pie data
  const stockStatusData = [
    { name: '適正', value: stats.adequate, color: '#22C55E' },
    { name: '過剰', value: stats.excess, color: '#F59E0B' },
    { name: '不足', value: stats.shortage, color: '#EF4444' },
    { name: '欠品', value: stats.outOfStock, color: '#991B1B' },
  ].filter(d => d.value > 0);

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
        <div className="text-center">
          <Package size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">この店舗の在庫計画がありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 h-[calc(100vh-120px)]">
      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-red-600" />
            <h2 className="text-sm font-semibold text-gray-700">在庫計画 - {plan.season}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              plan.status === '承認済' ? 'bg-green-100 text-green-700' :
              plan.status === '承認待ち' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-200 text-gray-600'
            }`}>
              {plan.status}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex bg-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1 text-xs border-none cursor-pointer ${activeTab === 'list' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              >
                一覧
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-3 py-1 text-xs border-none cursor-pointer ${activeTab === 'analysis' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-300'}`}
              >
                分析
              </button>
            </div>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <select
              value={plan.status}
              onChange={e => handleStatusChange(e.target.value as '作成中' | '承認待ち' | '承認済')}
              className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="作成中">作成中</option>
              <option value="承認待ち">承認待ち</option>
              <option value="承認済">承認済</option>
            </select>
            <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 border-none cursor-pointer">
              <Save size={12} />
              保存
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-6 gap-2 p-3 border-b border-gray-100">
          <div className="bg-gray-50 rounded-md p-2 text-center">
            <div className="text-lg font-bold text-gray-700">{stats.total}</div>
            <div className="text-[10px] text-gray-500">総SKU数</div>
          </div>
          <div className="bg-green-50 rounded-md p-2 text-center">
            <div className="text-lg font-bold text-green-700">{stats.adequate}</div>
            <div className="text-[10px] text-green-600">適正</div>
          </div>
          <div className="bg-amber-50 rounded-md p-2 text-center">
            <div className="text-lg font-bold text-amber-700">{stats.excess}</div>
            <div className="text-[10px] text-amber-600">過剰</div>
          </div>
          <div className="bg-red-50 rounded-md p-2 text-center">
            <div className="text-lg font-bold text-red-700">{stats.shortage + stats.outOfStock}</div>
            <div className="text-[10px] text-red-600">不足・欠品</div>
          </div>
          <div className="bg-blue-50 rounded-md p-2 text-center">
            <div className="text-sm font-bold text-blue-700">¥{(stats.totalValue / 10000).toFixed(0)}万</div>
            <div className="text-[10px] text-blue-500">在庫金額</div>
          </div>
          <div className="bg-purple-50 rounded-md p-2 text-center">
            <div className="text-sm font-bold text-purple-700">¥{(stats.totalOrderValue / 10000).toFixed(0)}万</div>
            <div className="text-[10px] text-purple-500">発注金額</div>
          </div>
        </div>

        {activeTab === 'list' ? (
          <>
            {/* Filters */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <div className="relative flex-1 max-w-xs">
                <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="商品名 / SKUコードで検索..."
                  className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <Filter size={12} className="text-gray-400" />
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500">
                {categories.map(c => <option key={c} value={c}>{c === 'all' ? '全カテゴリ' : c}</option>)}
              </select>
              <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500">
                {genders.map(g => <option key={g} value={g}>{g === 'all' ? '全性別' : g}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="all">全ステータス</option>
                <option value="適正">適正</option>
                <option value="過剰">過剰</option>
                <option value="不足">不足</option>
                <option value="欠品">欠品</option>
              </select>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('name')}>
                      <span className="flex items-center gap-1">商品名 <ArrowUpDown size={10} /></span>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-gray-500">SKU</th>
                    <th className="text-left px-2 py-2 font-medium text-gray-500">カテゴリ</th>
                    <th className="text-right px-2 py-2 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('currentStock')}>
                      <span className="flex items-center justify-end gap-1">現在庫 <ArrowUpDown size={10} /></span>
                    </th>
                    <th className="text-right px-2 py-2 font-medium text-gray-500">安全在庫</th>
                    <th className="text-right px-2 py-2 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('weeklyDemand')}>
                      <span className="flex items-center justify-end gap-1">週間需要 <ArrowUpDown size={10} /></span>
                    </th>
                    <th className="text-right px-2 py-2 font-medium text-gray-500">発注点</th>
                    <th className="text-right px-2 py-2 font-medium text-gray-500">発注数</th>
                    <th className="text-center px-2 py-2 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('stockStatus')}>
                      <span className="flex items-center justify-center gap-1">状態 <ArrowUpDown size={10} /></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => {
                    const statusStyle = STATUS_COLORS[item.stockStatus] || STATUS_COLORS['適正'];
                    const stockRatio = item.safetyStock > 0 ? (item.currentStock / item.safetyStock) : 0;
                    const isSelected = selectedItemId === item.id;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                        className={`border-b border-gray-100 cursor-pointer transition-colors ${
                          isSelected ? 'bg-red-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-800 truncate max-w-[200px]">{item.product.name}</div>
                          <div className="text-gray-400">{item.product.gender} / {item.product.colorCode}</div>
                        </td>
                        <td className="px-2 py-2 text-gray-500 font-mono">{item.product.skuCode.substring(0, 12)}</td>
                        <td className="px-2 py-2 text-gray-600">{item.product.category}</td>
                        <td className="px-2 py-2 text-right">
                          <div className="font-medium text-gray-800">{item.currentStock}</div>
                          <div className="w-full h-1 bg-gray-200 rounded-full mt-0.5">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, stockRatio * 50)}%`,
                                backgroundColor: stockRatio < 1 ? '#EF4444' : stockRatio < 2 ? '#22C55E' : '#F59E0B',
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-2 py-2 text-right text-gray-600">{item.safetyStock}</td>
                        <td className="px-2 py-2 text-right text-gray-600">{item.weeklyDemand}/週</td>
                        <td className="px-2 py-2 text-right text-gray-600">{item.reorderPoint}</td>
                        <td className="px-2 py-2 text-right">
                          <input
                            type="number"
                            value={item.orderQuantity}
                            onChange={e => handleUpdateOrderQty(item.id, parseInt(e.target.value) || 0)}
                            onClick={e => e.stopPropagation()}
                            className="w-16 text-right border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                            min={0}
                          />
                        </td>
                        <td className="px-2 py-2 text-center">
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            {item.stockStatus === '適正' && <CheckCircle size={10} />}
                            {item.stockStatus === '過剰' && <TrendingUp size={10} />}
                            {(item.stockStatus === '不足' || item.stockStatus === '欠品') && <AlertTriangle size={10} />}
                            {item.stockStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Analysis Tab */
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Category stock value */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1">
                  <BarChart3 size={12} />
                  カテゴリ別在庫金額
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categorySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}万`} />
                    <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey="stockValue" radius={[3, 3, 0, 0]} barSize={24}>
                      {categorySales.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Stock status pie chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3">在庫ステータス分布</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      dataKey="value"
                      label={({ name, value }: { name?: string; value?: number }) => `${name ?? ''}: ${value ?? 0}`}
                    >
                      {stockStatusData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Weekly sales trend */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3">週次売上・在庫回転率</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}万`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#DC2626" name="売上" dot={{ r: 3 }} />
                    <Line yAxisId="right" type="monotone" dataKey="stockTurnover" stroke="#2563EB" name="回転率" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category turnover days */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-3">カテゴリ別回転日数</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categorySales} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `${value}日`} contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey="turnoverDays" radius={[0, 3, 3, 0]} barSize={14} fill="#DC2626" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Item detail */}
      <div className="w-60 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-3 py-2 border-b border-gray-200 bg-red-50">
          <h2 className="text-xs font-semibold text-gray-700">商品詳細</h2>
        </div>

        {selectedItem ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* Product info */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-semibold text-gray-800">{selectedItem.product.name}</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full shrink-0 border border-gray-200" style={{ backgroundColor: selectedItem.product.color }} />
                <span className="text-[10px] text-gray-500">{selectedItem.product.colorCode} / {selectedItem.product.size}</span>
              </div>
              <div className="text-[10px] text-gray-500 font-mono">{selectedItem.product.skuCode}</div>
            </div>

            {/* Stock gauge */}
            <div className="space-y-1">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase">在庫水準</h4>
              <div className="relative h-20 bg-gray-50 rounded-md border border-gray-200 p-2">
                <div className="flex items-end justify-between h-full">
                  <div className="flex flex-col items-center flex-1">
                    <div className="text-[9px] text-red-500">欠品</div>
                    <div className="w-full bg-red-200 rounded-t" style={{ height: '20%' }} />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="text-[9px] text-gray-500">安全</div>
                    <div className="w-full bg-amber-200 rounded-t" style={{ height: `${Math.min(100, (selectedItem.safetyStock / selectedItem.maxStock) * 100)}%` }} />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="text-[9px] text-blue-600 font-bold">現在</div>
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${Math.min(100, (selectedItem.currentStock / selectedItem.maxStock) * 100)}%`,
                        backgroundColor: selectedItem.stockStatus === '適正' ? '#22C55E' : selectedItem.stockStatus === '過剰' ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="text-[9px] text-gray-500">最大</div>
                    <div className="w-full bg-gray-300 rounded-t" style={{ height: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Key metrics */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase">在庫指標</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">現在庫</span>
                  <span className="font-medium text-gray-700">{selectedItem.currentStock}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">安全在庫</span>
                  <span className="font-medium text-gray-700">{selectedItem.safetyStock}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">発注点</span>
                  <span className="font-medium text-gray-700">{selectedItem.reorderPoint}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">最大在庫</span>
                  <span className="font-medium text-gray-700">{selectedItem.maxStock}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">週間需要</span>
                  <span className="font-medium text-gray-700">{selectedItem.weeklyDemand}点/週</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">在庫日数</span>
                  <span className="font-medium text-gray-700">
                    {selectedItem.weeklyDemand > 0 ? Math.round(selectedItem.currentStock / selectedItem.weeklyDemand * 7) : '-'}日
                  </span>
                </div>
              </div>
            </div>

            {/* Order info */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase flex items-center gap-1">
                <Truck size={10} />
                発注情報
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">発注数</span>
                  <span className="font-medium text-red-700">{selectedItem.orderQuantity}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">発注金額</span>
                  <span className="font-medium text-gray-700">¥{(selectedItem.orderQuantity * selectedItem.product.cost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">リードタイム</span>
                  <span className="font-medium text-gray-700">{selectedItem.product.leadTimeDays}日</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">前回発注</span>
                  <span className="font-medium text-gray-700">{selectedItem.lastOrderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">次回納品</span>
                  <span className="font-medium text-gray-700">{selectedItem.nextDeliveryDate}</span>
                </div>
              </div>
            </div>

            {/* Price info */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase">価格情報</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">売価</span>
                  <span className="font-medium text-gray-700">¥{selectedItem.product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">原価</span>
                  <span className="font-medium text-gray-700">¥{selectedItem.product.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">粗利率</span>
                  <span className="font-medium text-green-700">
                    {((1 - selectedItem.product.cost / selectedItem.product.price) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 p-4">
            <div className="text-center">
              <Package size={24} className="mx-auto mb-2 opacity-30" />
              <p className="text-[10px]">商品を選択すると詳細が表示されます</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
