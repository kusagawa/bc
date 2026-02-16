import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  ScatterChart, Scatter, ZAxis, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ComposedChart, Area,
} from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { categorySales, monthlySales, products } from '../../data/mockData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

// ABC analysis data
const abcData = [...products]
  .sort((a, b) => (b.price * b.salesVolume) - (a.price * a.salesVolume))
  .map((p, i, arr) => {
    const sales = p.price * p.salesVolume;
    const cumSales = arr.slice(0, i + 1).reduce((sum, x) => sum + x.price * x.salesVolume, 0);
    const totalSales = arr.reduce((sum, x) => sum + x.price * x.salesVolume, 0);
    const cumPercent = (cumSales / totalSales) * 100;
    const rank = cumPercent <= 70 ? 'A' : cumPercent <= 90 ? 'B' : 'C';
    return {
      name: p.name.length > 8 ? p.name.substring(0, 8) + '..' : p.name,
      fullName: p.name,
      sales,
      cumPercent: Math.round(cumPercent * 10) / 10,
      rank,
      profit: (p.price - p.cost) * p.salesVolume,
      profitRate: ((p.price - p.cost) / p.price * 100),
    };
  });

// Cross ABC data (sales vs profit rate)
const crossAbcData = products.map(p => ({
  name: p.name,
  sales: p.price * p.salesVolume,
  profitRate: ((p.price - p.cost) / p.price * 100),
  category: p.category,
  volume: p.salesVolume,
}));

// Radar data for categories
const radarData = categorySales.map(cs => ({
  category: cs.category,
  売上: cs.sales / 50000,
  粗利: cs.profit / 20000,
  数量: cs.quantity / 350,
  構成比: cs.sharePercent * 3,
}));

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'abc' | 'cross' | 'trend'>('overview');
  const [period, setPeriod] = useState('2026/02');

  const tabs = [
    { id: 'overview' as const, label: '売上概況' },
    { id: 'abc' as const, label: 'ABC分析' },
    { id: 'cross' as const, label: 'クロスABC' },
    { id: 'trend' as const, label: 'トレンド分析' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">売上分析</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 bg-white">
            <Calendar size={14} />
            <input
              type="month"
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="border-none text-xs focus:outline-none bg-transparent"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">
            <Download size={14} />
            レポート出力
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-xs rounded-md border-none cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-500 hover:text-gray-700 bg-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別売上構成</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey="sales"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  label={(props) => `${(props as unknown as { category: string; sharePercent: number }).category} ${(props as unknown as { category: string; sharePercent: number }).sharePercent}%`}
                >
                  {categorySales.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別レーダーチャート</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fontSize: 9 }} />
                <Radar name="売上" dataKey="売上" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                <Radar name="粗利" dataKey="粗利" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                <Radar name="数量" dataKey="数量" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">月別売上・粗利推移（目標対比）</h2>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="target" name="目標" fill="#EDE9FE" stroke="#8B5CF6" strokeDasharray="5 5" />
                <Bar dataKey="sales" name="売上" fill="#3B82F6" radius={[3, 3, 0, 0]} barSize={30} />
                <Line type="monotone" dataKey="profit" name="粗利" stroke="#10B981" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ABC Analysis Tab */}
      {activeTab === 'abc' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">ABC分析（パレート図）</h2>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={abcData.slice(0, 20)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number | string | (number | string)[] | undefined, name: string | undefined) =>
                    name === '累積構成比' ? `${value}%` : `¥${Number(value ?? 0).toLocaleString()}`
                  }
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="sales" name="売上" radius={[3, 3, 0, 0]} barSize={20}>
                  {abcData.slice(0, 20).map((d, i) => (
                    <Cell key={i} fill={d.rank === 'A' ? '#3B82F6' : d.rank === 'B' ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="cumPercent" name="累積構成比" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-3 justify-center">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-gray-600">Aランク（~70%）: {abcData.filter(d => d.rank === 'A').length}品</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-3 h-3 rounded-sm bg-amber-500" />
                <span className="text-gray-600">Bランク（70~90%）: {abcData.filter(d => d.rank === 'B').length}品</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-3 h-3 rounded-sm bg-red-500" />
                <span className="text-gray-600">Cランク（90%~）: {abcData.filter(d => d.rank === 'C').length}品</span>
              </div>
            </div>
          </div>

          {/* ABC Ranking table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700">ABC分析ランキング</h2>
            </div>
            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">順位</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">商品名</th>
                    <th className="px-3 py-2 text-right text-gray-500 font-medium">月間売上</th>
                    <th className="px-3 py-2 text-right text-gray-500 font-medium">月間粗利</th>
                    <th className="px-3 py-2 text-right text-gray-500 font-medium">粗利率</th>
                    <th className="px-3 py-2 text-right text-gray-500 font-medium">累積構成比</th>
                    <th className="px-3 py-2 text-center text-gray-500 font-medium">ランク</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {abcData.map((d, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-1.5 text-gray-600">{i + 1}</td>
                      <td className="px-3 py-1.5 text-gray-900">{d.fullName}</td>
                      <td className="px-3 py-1.5 text-right text-gray-900">¥{d.sales.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right text-green-700">¥{d.profit.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right text-gray-600">{d.profitRate.toFixed(1)}%</td>
                      <td className="px-3 py-1.5 text-right text-gray-600">{d.cumPercent}%</td>
                      <td className="px-3 py-1.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          d.rank === 'A' ? 'bg-blue-100 text-blue-700' :
                          d.rank === 'B' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {d.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Cross ABC Tab */}
      {activeTab === 'cross' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">クロスABC分析（売上 × 粗利率）</h2>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" dataKey="sales" name="売上" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} label={{ value: '月間売上', position: 'insideBottom', offset: -5, fontSize: 11 }} />
              <YAxis type="number" dataKey="profitRate" name="粗利率" tick={{ fontSize: 10 }} tickFormatter={(v) => `${v.toFixed(0)}%`} label={{ value: '粗利率', angle: -90, position: 'insideLeft', fontSize: 11 }} />
              <ZAxis type="number" dataKey="volume" range={[40, 200]} />
              <Tooltip
                formatter={(value: number | string | (number | string)[] | undefined, name: string | undefined) =>
                  name === '粗利率' ? `${Number(value ?? 0).toFixed(1)}%` : `¥${Number(value ?? 0).toLocaleString()}`
                }
                labelFormatter={(_, payload) => payload?.[0]?.payload?.name || ''}
              />
              <Scatter data={crossAbcData.filter(d => d.category === '飲料')} fill="#3B82F6" name="飲料" />
              <Scatter data={crossAbcData.filter(d => d.category === '菓子')} fill="#10B981" name="菓子" />
              <Scatter data={crossAbcData.filter(d => d.category === '食品')} fill="#F59E0B" name="食品" />
              <Scatter data={crossAbcData.filter(d => d.category === '日用品')} fill="#EF4444" name="日用品" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {/* Reference lines for quadrants */}
              <CartesianGrid strokeDasharray="0" stroke="transparent" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="p-2 rounded-md bg-blue-50 text-center">
              <div className="text-xs font-medium text-blue-700">高売上・高粗利</div>
              <div className="text-[10px] text-blue-500 mt-0.5">主力商品</div>
            </div>
            <div className="p-2 rounded-md bg-green-50 text-center">
              <div className="text-xs font-medium text-green-700">低売上・高粗利</div>
              <div className="text-[10px] text-green-500 mt-0.5">育成候補</div>
            </div>
            <div className="p-2 rounded-md bg-amber-50 text-center">
              <div className="text-xs font-medium text-amber-700">高売上・低粗利</div>
              <div className="text-[10px] text-amber-500 mt-0.5">見直し検討</div>
            </div>
            <div className="p-2 rounded-md bg-red-50 text-center">
              <div className="text-xs font-medium text-red-700">低売上・低粗利</div>
              <div className="text-[10px] text-red-500 mt-0.5">カット候補</div>
            </div>
          </div>
        </div>
      )}

      {/* Trend Tab */}
      {activeTab === 'trend' && (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別売上トレンド</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
                <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `¥${Number(value ?? 0).toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="sales" name="売上" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" name="粗利" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="target" name="目標" stroke="#8B5CF6" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">目標達成率推移</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlySales.map(m => ({
                ...m,
                achieveRate: (m.sales / m.target * 100),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[80, 120]} />
                <Tooltip formatter={(value: number | string | (number | string)[] | undefined) => `${Number(value ?? 0).toFixed(1)}%`} />
                <Bar dataKey="achieveRate" name="達成率" radius={[3, 3, 0, 0]} barSize={30}>
                  {monthlySales.map((m, i) => (
                    <Cell key={i} fill={m.sales >= m.target ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
