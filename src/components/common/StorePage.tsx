import { Store, MapPin, Grid3X3 } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { gondolas } from '../../data/mockData';

export default function StorePage() {
  const { stores, selectedStoreId, setSelectedStoreId } = useAppContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">店舗管理</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 border-none cursor-pointer transition-colors">
          <Store size={14} />
          新規店舗追加
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stores.map(store => {
          const storeGondolas = gondolas.filter(g => g.storeId === store.id);
          const confirmedCount = storeGondolas.filter(g => g.status === '確定').length;
          const isSelected = store.id === selectedStoreId;

          return (
            <div
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{store.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">コード: {store.code}</p>
                </div>
                {isSelected && (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                    選択中
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin size={12} className="text-gray-400" />
                  <span>{store.area}</span>
                  <span className="text-gray-300">|</span>
                  <span>{store.format}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Grid3X3 size={12} className="text-gray-400" />
                  <span>売場面積: {store.salesArea.toLocaleString()}m²</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">ゴンドラ数</span>
                  <span className="font-medium text-gray-700">{storeGondolas.length}本</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">確定棚割</span>
                  <span className="font-medium text-green-600">{confirmedCount} / {storeGondolas.length}</span>
                </div>
                {storeGondolas.length > 0 && (
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(confirmedCount / storeGondolas.length) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
