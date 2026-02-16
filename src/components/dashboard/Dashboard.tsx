import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Grid3X3,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  ComposedChart, Area, Line,
} from 'recharts';
import { dashboardStats, categorySales, monthlySales, gondolas } from '../../data/mockData';
import { useAppContext } from '../../store/AppContext';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

function StatCard({ icon: Icon, label, value, subValue, trend, color }: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down';
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
        {subValue && (
          <div className="flex items-center gap-1 mt-0.5">
            {trend === 'up' && <TrendingUp size={12} className="text-green-500" />}
            {trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
            <span className={`text-xs ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
              {subValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function formatYen(n: number) {
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億`;
  if (n >= 10000) return `${(n / 10000).toFixed(0)}万`;
  return n.toLocaleString();
}

export default function Dashboard() {
  const { selectedStoreId } = useAppContext();
  const storeGondolas = gondolas.filter(g => g.storeId === selectedStoreId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">ダッシュボード</h1>
        <span className="text-sm text-gray-500">最終更新: 2026/02/16 09:00</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard
          icon={DollarSign}
          label="月間売上高"
          value={`¥${formatYen(dashboardStats.totalSales)}`}
          subValue="前月比 +3.2%"
          trend="up"
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          label="粗利益額"
          value={`¥${formatYen(dashboardStats.totalProfit)}`}
          subValue={`粗利率 ${dashboardStats.profitRate}%`}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          icon={Grid3X3}
          label="棚割数"
          value={`${dashboardStats.gondolaCount}本`}
          subValue={`確定 ${dashboardStats.confirmedPlanograms} / 未確定 ${dashboardStats.pendingPlanograms}`}
          color="bg-amber-500"
        />
        <StatCard
          icon={Package}
          label="登録商品数"
          value={`${dashboardStats.productCount.toLocaleString()}品`}
          subValue={`${dashboardStats.storeCount}店舗運用中`}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly sales trend */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">月別売上推移</h2>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="target" name="目標" fill="#E0E7FF" stroke="#6366F1" strokeDasharray="5 5" />
              <Bar dataKey="sales" name="売上" fill="#3B82F6" radius={[3, 3, 0, 0]} barSize={30} />
              <Line type="monotone" dataKey="profit" name="粗利" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別売上構成</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="sales"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={75}
                innerRadius={40}
                paddingAngle={2}
              >
                {categorySales.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categorySales.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-gray-600 truncate">{cat.category}</span>
                <span className="text-gray-400 ml-auto">{cat.sharePercent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Category bar chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別売上・粗利</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categorySales} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="sales" name="売上" fill="#3B82F6" radius={[0, 3, 3, 0]} barSize={14} />
              <Bar dataKey="profit" name="粗利" fill="#10B981" radius={[0, 3, 3, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Planogram status list */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">棚割ステータス（当店）</h2>
          <div className="space-y-2 max-h-[260px] overflow-y-auto">
            {storeGondolas.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">当店の棚割データがありません</p>
            )}
            {storeGondolas.map(g => (
              <div key={g.id} className="flex items-center gap-3 p-2.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="shrink-0">
                  {g.status === '確定' && <CheckCircle size={18} className="text-green-500" />}
                  {g.status === '仮確定' && <Clock size={18} className="text-amber-500" />}
                  {g.status === '作成中' && <Clock size={18} className="text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{g.name}</p>
                  <p className="text-xs text-gray-500">{g.category} / {g.shelves.length}段 / 更新: {g.lastModified}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  g.status === '確定' ? 'bg-green-100 text-green-700' :
                  g.status === '仮確定' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
