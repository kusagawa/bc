import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Map,
  BarChart3,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Boxes,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'ダッシュボード' },
  { to: '/products', icon: Package, label: '商品マスタ' },
  { to: '/planogram', icon: Grid3X3, label: '棚割管理' },
  { to: '/floorplan', icon: Map, label: '売場レイアウト' },
  { to: '/analysis', icon: BarChart3, label: '売上分析' },
  { to: '/stores', icon: Store, label: '店舗管理' },
];

const uniqloNavItems = [
  { to: '/uniqlo-floorplan', icon: Shirt, label: 'UQ売場計画' },
  { to: '/uniqlo-inventory', icon: Boxes, label: 'UQ在庫計画' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
      style={{ backgroundColor: 'var(--color-sidebar)' }}
    >
      {/* Logo */}
      <div className="flex items-center px-4 h-14 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              SPS
            </div>
            <span className="text-white font-semibold text-sm">売場計画システム</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs mx-auto">
            S
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* UNIQLO Section */}
        <div className="mx-2 my-2 border-t border-gray-700" />
        {!collapsed && (
          <div className="px-4 py-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">UNIQLO</span>
          </div>
        )}
        {uniqloNavItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Settings & Collapse */}
      <div className="border-t border-gray-700 py-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <Settings size={18} />
          {!collapsed && <span>設定</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors w-full border-none bg-transparent cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>折りたたむ</span>}
        </button>
      </div>
    </aside>
  );
}
