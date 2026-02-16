import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

export default function Header() {
  const { stores, selectedStoreId, setSelectedStoreId } = useAppContext();
  const selectedStore = stores.find(s => s.id === selectedStoreId);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
      {/* Left: Breadcrumb / Store selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {stores.map(store => (
              <option key={store.id} value={store.id}>
                {store.name}（{store.code}）
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {selectedStore && (
          <span className="text-xs text-gray-500">
            {selectedStore.area} / {selectedStore.format} / {selectedStore.salesArea}m²
          </span>
        )}
      </div>

      {/* Right: Search, notifications, user */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="検索..."
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors border-none bg-transparent cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={16} className="text-blue-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-700">管理者</div>
          </div>
        </div>
      </div>
    </header>
  );
}
