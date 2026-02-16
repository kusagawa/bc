import { Save, Database, Palette, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900">設定</h1>

      {/* General Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Globe size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">一般設定</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">システム名</label>
              <input
                defaultValue="SPS 売場計画システム"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">言語</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>日本語</option>
                <option>English</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">デフォルト店舗</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>渋谷中央店（TK001）</option>
              <option>新宿南口店（TK002）</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gondola Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Database size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">ゴンドラ標準設定</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">標準幅（mm）</label>
              <input
                type="number"
                defaultValue={900}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">標準高さ（mm）</label>
              <input
                type="number"
                defaultValue={1800}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">標準奥行（mm）</label>
              <input
                type="number"
                defaultValue={450}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">標準段数</label>
              <input
                type="number"
                defaultValue={5}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">表示スケール</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>0.5 (50%)</option>
                <option>0.75 (75%)</option>
                <option selected>1.0 (100%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Palette size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">表示設定</h2>
        </div>
        <div className="p-4 space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">棚割エディタにグリッドを表示</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">商品名をプラノグラム上に表示</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">フェイス数を表示</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">売上ヒートマップを有効化</span>
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Bell size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">通知設定</h2>
        </div>
        <div className="p-4 space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">棚割確定時に通知</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">商品マスタ更新時に通知</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">日次レポート配信</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 border-none cursor-pointer transition-colors">
          <Save size={14} />
          設定を保存
        </button>
      </div>
    </div>
  );
}
