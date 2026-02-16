import { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../types';

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const categories = ['飲料', '菓子', '食品', '日用品', '青果', '精肉', '鮮魚', '惣菜'];

export default function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  const [form, setForm] = useState<Product>(product || {
    id: '',
    janCode: '',
    name: '',
    category: '飲料',
    subCategory: '',
    maker: '',
    price: 0,
    cost: 0,
    width: 0,
    height: 0,
    depth: 0,
    color: '#3B82F6',
    salesVolume: 0,
    stockDays: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            {product ? '商品編集' : '商品新規登録'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">JANコード</label>
              <input
                name="janCode"
                value={form.janCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">商品名</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">カテゴリ</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">サブカテゴリ</label>
              <input
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">メーカー</label>
              <input
                name="maker"
                value={form.maker}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">売価（円）</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">原価（円）</label>
              <input
                name="cost"
                type="number"
                value={form.cost}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">表示色</label>
              <input
                name="color"
                type="color"
                value={form.color}
                onChange={handleChange}
                className="w-full h-8 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">幅（mm）</label>
              <input
                name="width"
                type="number"
                value={form.width}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">高さ（mm）</label>
              <input
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">奥行（mm）</label>
              <input
                name="depth"
                type="number"
                value={form.depth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">月間販売数</label>
              <input
                name="salesVolume"
                type="number"
                value={form.salesVolume}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">在庫日数</label>
              <input
                name="stockDays"
                type="number"
                value={form.stockDays}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 border-none cursor-pointer transition-colors"
            >
              {product ? '更新' : '登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
