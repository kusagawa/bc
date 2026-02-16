import { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, Filter, Download, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import type { Product } from '../../types';
import { v4 as uuid } from 'uuid';
import ProductForm from './ProductForm';

type SortKey = keyof Product;
type SortDir = 'asc' | 'desc';

export default function ProductList() {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.janCode.includes(q) ||
        p.maker.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc'
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
    return result;
  }, [products, search, categoryFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (field !== sortKey) return null;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const handleNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product);
    } else {
      addProduct({ ...product, id: uuid() });
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('この商品を削除してもよろしいですか？')) {
      deleteProduct(id);
    }
  };

  const profitRate = (p: Product) => ((p.price - p.cost) / p.price * 100).toFixed(1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">商品マスタ</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">
            <Upload size={14} />
            インポート
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">
            <Download size={14} />
            エクスポート
          </button>
          <button
            onClick={handleNew}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 border-none cursor-pointer transition-colors"
          >
            <Plus size={14} />
            新規登録
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="商品名・JANコード・メーカーで検索..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-gray-400" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? '全カテゴリ' : c}</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-gray-500 ml-auto">{filtered.length}件 / {products.length}件</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[calc(100vh-280px)]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {[
                  { key: 'janCode' as SortKey, label: 'JANコード', w: 'w-28' },
                  { key: 'name' as SortKey, label: '商品名', w: 'w-48' },
                  { key: 'category' as SortKey, label: 'カテゴリ', w: 'w-20' },
                  { key: 'subCategory' as SortKey, label: 'サブカテゴリ', w: 'w-28' },
                  { key: 'maker' as SortKey, label: 'メーカー', w: 'w-24' },
                  { key: 'price' as SortKey, label: '売価', w: 'w-16' },
                  { key: 'cost' as SortKey, label: '原価', w: 'w-16' },
                  { key: 'price' as SortKey, label: '粗利率', w: 'w-16' },
                  { key: 'salesVolume' as SortKey, label: '月販数', w: 'w-16' },
                  { key: 'width' as SortKey, label: 'W×H×D', w: 'w-24' },
                ].map(col => (
                  <th
                    key={col.label}
                    onClick={() => handleSort(col.key)}
                    className={`${col.w} px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 select-none`}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon field={col.key} />
                    </span>
                  </th>
                ))}
                <th className="w-20 px-3 py-2 text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-3 py-2 text-xs font-mono text-gray-600">{p.janCode}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="text-gray-900 truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{p.category}</td>
                  <td className="px-3 py-2 text-gray-600">{p.subCategory}</td>
                  <td className="px-3 py-2 text-gray-600">{p.maker}</td>
                  <td className="px-3 py-2 text-right text-gray-900">¥{p.price}</td>
                  <td className="px-3 py-2 text-right text-gray-600">¥{p.cost}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{profitRate(p)}%</td>
                  <td className="px-3 py-2 text-right text-gray-600">{p.salesVolume}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{p.width}×{p.height}×{p.depth}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
