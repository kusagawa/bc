import { useState, useMemo } from 'react';
import { useAppContext } from '../../store/AppContext';
import type { Gondola, Product, ShelfProduct } from '../../types';
import { Plus, Save, CheckCircle, Clock, Search, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import GondolaView from './GondolaView';
import PlanogramDetail from './PlanogramDetail';

export default function PlanogramEditor() {
  const { gondolas, products, updateGondola, addGondola, selectedStoreId } = useAppContext();
  const [selectedGondolaId, setSelectedGondolaId] = useState<string | null>(
    gondolas.find(g => g.storeId === selectedStoreId)?.id || null
  );
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [dragProduct, setDragProduct] = useState<Product | null>(null);

  const storeGondolas = gondolas.filter(g => g.storeId === selectedStoreId);
  const selectedGondola = gondolas.find(g => g.id === selectedGondolaId) || null;

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.janCode.includes(q));
    }
    return result;
  }, [products, search, categoryFilter]);

  const handleNewGondola = () => {
    const newGondola: Gondola = {
      id: uuid(),
      name: `新規ゴンドラ ${storeGondolas.length + 1}`,
      width: 900,
      height: 1800,
      depth: 450,
      category: '飲料',
      storeId: selectedStoreId,
      lastModified: new Date().toISOString().split('T')[0],
      status: '作成中',
      shelves: [
        { id: uuid(), shelfNumber: 1, height: 300, width: 900, depth: 450, y: 0, products: [] },
        { id: uuid(), shelfNumber: 2, height: 300, width: 900, depth: 450, y: 350, products: [] },
        { id: uuid(), shelfNumber: 3, height: 300, width: 900, depth: 450, y: 700, products: [] },
        { id: uuid(), shelfNumber: 4, height: 300, width: 900, depth: 450, y: 1050, products: [] },
      ],
    };
    addGondola(newGondola);
    setSelectedGondolaId(newGondola.id);
  };

  const handleDropProduct = (shelfId: string, product: Product) => {
    if (!selectedGondola) return;
    const updated = { ...selectedGondola };
    updated.shelves = updated.shelves.map(s => {
      if (s.id !== shelfId) return s;
      const existingWidth = s.products.reduce((sum, sp) => {
        return sum + sp.product.width * sp.facing;
      }, 0);
      const newProduct: ShelfProduct = {
        id: uuid(),
        productId: product.id,
        product: product,
        x: existingWidth,
        y: 0,
        facing: 1,
        stacking: 1,
      };
      return { ...s, products: [...s.products, newProduct] };
    });
    updated.lastModified = new Date().toISOString().split('T')[0];
    updateGondola(updated);
  };

  const handleRemoveProduct = (shelfId: string, spId: string) => {
    if (!selectedGondola) return;
    const updated = { ...selectedGondola };
    updated.shelves = updated.shelves.map(s => {
      if (s.id !== shelfId) return s;
      return { ...s, products: s.products.filter(sp => sp.id !== spId) };
    });
    updated.lastModified = new Date().toISOString().split('T')[0];
    updateGondola(updated);
  };

  const handleUpdateFacing = (shelfId: string, spId: string, facing: number) => {
    if (!selectedGondola) return;
    const updated = { ...selectedGondola };
    updated.shelves = updated.shelves.map(s => {
      if (s.id !== shelfId) return s;
      return {
        ...s,
        products: s.products.map(sp =>
          sp.id === spId ? { ...sp, facing: Math.max(1, facing) } : sp
        ),
      };
    });
    updateGondola(updated);
  };

  const handleStatusChange = (status: Gondola['status']) => {
    if (!selectedGondola) return;
    updateGondola({ ...selectedGondola, status, lastModified: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="flex gap-3 h-[calc(100vh-120px)]">
      {/* Left Panel: Gondola list + Product palette */}
      <div className="w-64 flex flex-col gap-3 shrink-0">
        {/* Gondola list */}
        <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
            <h2 className="text-xs font-semibold text-gray-700">ゴンドラ一覧</h2>
            <button
              onClick={handleNewGondola}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded bg-transparent border-none cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {storeGondolas.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGondolaId(g.id)}
                className={`w-full text-left p-2 rounded-md text-xs transition-colors border-none cursor-pointer ${
                  selectedGondolaId === g.id
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="font-medium truncate">{g.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5 text-gray-500">
                  {g.status === '確定' && <CheckCircle size={10} className="text-green-500" />}
                  {g.status !== '確定' && <Clock size={10} className="text-amber-500" />}
                  <span>{g.status}</span>
                  <span>·</span>
                  <span>{g.category}</span>
                </div>
              </button>
            ))}
            {storeGondolas.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">ゴンドラがありません</p>
            )}
          </div>
        </div>

        {/* Product palette */}
        <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-200">
            <h2 className="text-xs font-semibold text-gray-700 mb-2">商品パレット</h2>
            <div className="relative mb-1.5">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="商品検索..."
                className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'all' ? '全カテゴリ' : c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                draggable
                onDragStart={() => setDragProduct(p)}
                onDragEnd={() => setDragProduct(null)}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 cursor-grab active:cursor-grabbing text-xs transition-colors"
              >
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: p.color }} />
                <div className="flex-1 min-w-0">
                  <div className="truncate text-gray-800">{p.name}</div>
                  <div className="text-gray-400">¥{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Gondola visual editor */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
        {selectedGondola ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-gray-700">{selectedGondola.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  selectedGondola.status === '確定' ? 'bg-green-100 text-green-700' :
                  selectedGondola.status === '仮確定' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {selectedGondola.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                  className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer"
                  title="縮小"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                  className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer"
                  title="拡大"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer"
                  title="リセット"
                >
                  <RotateCcw size={14} />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <select
                  value={selectedGondola.status}
                  onChange={e => handleStatusChange(e.target.value as Gondola['status'])}
                  className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="作成中">作成中</option>
                  <option value="仮確定">仮確定</option>
                  <option value="確定">確定</option>
                </select>
                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 border-none cursor-pointer ml-1">
                  <Save size={12} />
                  保存
                </button>
              </div>
            </div>

            {/* Gondola canvas */}
            <div className="flex-1 overflow-auto p-4 flex items-start justify-center bg-gray-100">
              <GondolaView
                gondola={selectedGondola}
                zoom={zoom}
                dragProduct={dragProduct}
                onDropProduct={handleDropProduct}
                onRemoveProduct={handleRemoveProduct}
                onUpdateFacing={handleUpdateFacing}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Info size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">ゴンドラを選択してください</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Detail */}
      {selectedGondola && (
        <PlanogramDetail gondola={selectedGondola} />
      )}
    </div>
  );
}
