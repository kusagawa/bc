import { useState, useRef, useCallback } from 'react';
import { useUniqloContext } from '../../store/UniqloContext';
import type { UniqloFloorArea } from '../../types/uniqlo';
import { Plus, Save, ZoomIn, ZoomOut, RotateCcw, Move, Square, Trash2, Grid3X3, Shirt } from 'lucide-react';
import { v4 as uuid } from 'uuid';

const CATEGORY_COLORS: Record<string, string> = {
  'メンズ': '#BBDEFB',
  'ウィメンズ': '#F8BBD0',
  'キッズ': '#C8E6C9',
  'ベビー': '#FFF9C4',
  'UT': '#FFE082',
  'インナー': '#E1BEE7',
  'スポーツ': '#B2EBF2',
  'アウター': '#64B5F6',
  'ディスプレイ': '#FFCCBC',
  'エントランス': '#E0E0E0',
  'レジ': '#D1C4E9',
  'フィッティング': '#CFD8DC',
  'バックヤード': '#BDBDBD',
};

const GRID_SIZE = 20;

export default function UniqloFloorPlanEditor() {
  const { floorPlans, updateFloorPlan, selectedStoreId, fixtures } = useUniqloContext();
  const plan = floorPlans.find(fp => fp.storeId === selectedStoreId) || null;

  const [zoom, setZoom] = useState(0.7);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'add'>('select');
  const [dragState, setDragState] = useState<{
    areaId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [resizeState, setResizeState] = useState<{
    areaId: string;
    startX: number;
    startY: number;
    origW: number;
    origH: number;
  } | null>(null);
  const [newArea, setNewArea] = useState<{ category: string }>({ category: 'メンズ' });
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedArea = plan?.areas.find(a => a.id === selectedAreaId) || null;

  const handleAreaMouseDown = (e: React.MouseEvent, area: UniqloFloorArea) => {
    if (tool !== 'select') return;
    e.stopPropagation();
    setSelectedAreaId(area.id);
    setDragState({
      areaId: area.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: area.x,
      origY: area.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, area: UniqloFloorArea) => {
    e.stopPropagation();
    setResizeState({
      areaId: area.id,
      startX: e.clientX,
      startY: e.clientY,
      origW: area.width,
      origH: area.height,
    });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!plan) return;

    if (dragState) {
      const dx = (e.clientX - dragState.startX) / zoom;
      const dy = (e.clientY - dragState.startY) / zoom;
      const newX = Math.round((dragState.origX + dx) / GRID_SIZE) * GRID_SIZE;
      const newY = Math.round((dragState.origY + dy) / GRID_SIZE) * GRID_SIZE;

      const updatedPlan = { ...plan };
      updatedPlan.areas = plan.areas.map(a =>
        a.id === dragState.areaId ? { ...a, x: Math.max(0, newX), y: Math.max(0, newY) } : a
      );
      updateFloorPlan(updatedPlan);
    }

    if (resizeState) {
      const dx = (e.clientX - resizeState.startX) / zoom;
      const dy = (e.clientY - resizeState.startY) / zoom;
      const newW = Math.round(Math.max(40, resizeState.origW + dx) / GRID_SIZE) * GRID_SIZE;
      const newH = Math.round(Math.max(40, resizeState.origH + dy) / GRID_SIZE) * GRID_SIZE;

      const updatedPlan = { ...plan };
      updatedPlan.areas = plan.areas.map(a =>
        a.id === resizeState.areaId ? { ...a, width: newW, height: newH } : a
      );
      updateFloorPlan(updatedPlan);
    }
  }, [dragState, resizeState, plan, zoom, updateFloorPlan]);

  const handleMouseUp = () => {
    setDragState(null);
    setResizeState(null);
  };

  const handleSvgClick = (e: React.MouseEvent) => {
    if (tool === 'select') {
      setSelectedAreaId(null);
      return;
    }
    if (tool === 'add' && plan && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / zoom) / GRID_SIZE) * GRID_SIZE;
      const y = Math.round(((e.clientY - rect.top) / zoom) / GRID_SIZE) * GRID_SIZE;
      const newAreaObj: UniqloFloorArea = {
        id: uuid(),
        name: newArea.category,
        x,
        y,
        width: 200,
        height: 160,
        category: newArea.category,
        color: CATEGORY_COLORS[newArea.category] || '#E0E0E0',
        fixtureIds: [],
        rotation: 0,
      };
      updateFloorPlan({
        ...plan,
        areas: [...plan.areas, newAreaObj],
        lastModified: new Date().toISOString().split('T')[0],
      });
      setTool('select');
      setSelectedAreaId(newAreaObj.id);
    }
  };

  const handleDeleteArea = () => {
    if (!plan || !selectedAreaId) return;
    updateFloorPlan({
      ...plan,
      areas: plan.areas.filter(a => a.id !== selectedAreaId),
    });
    setSelectedAreaId(null);
  };

  const handleUpdateAreaName = (name: string) => {
    if (!plan || !selectedAreaId) return;
    updateFloorPlan({
      ...plan,
      areas: plan.areas.map(a => a.id === selectedAreaId ? { ...a, name } : a),
    });
  };

  const handleStatusChange = (status: '作成中' | '仮確定' | '確定') => {
    if (!plan) return;
    updateFloorPlan({ ...plan, status, lastModified: new Date().toISOString().split('T')[0] });
  };

  const storeFixtures = fixtures.filter(f => f.storeId === selectedStoreId);

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-400">
        <div className="text-center">
          <Grid3X3 size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">この店舗のフロアプランがありません</p>
          <p className="text-xs mt-1 text-gray-300">フロアプランを作成してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 h-[calc(100vh-120px)]">
      {/* Left Panel: Area list */}
      <div className="w-56 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-3 py-2 border-b border-gray-200 bg-red-50">
          <div className="flex items-center gap-1.5">
            <Shirt size={14} className="text-red-600" />
            <h2 className="text-xs font-semibold text-gray-700">エリア管理</h2>
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">{plan.season}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {plan.areas.map(area => (
            <button
              key={area.id}
              onClick={() => { setSelectedAreaId(area.id); setTool('select'); }}
              className={`w-full text-left p-2 rounded-md text-xs transition-colors border-none cursor-pointer flex items-center gap-2 ${
                selectedAreaId === area.id ? 'bg-red-50 text-red-800' : 'hover:bg-gray-50 text-gray-700 bg-white'
              }`}
            >
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: area.color }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{area.name}</div>
                <div className="text-gray-400">{area.width}×{area.height} / 什器{area.fixtureIds.length}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected area properties */}
        {selectedArea && (
          <div className="border-t border-gray-200 p-3 space-y-2">
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase">プロパティ</h3>
            <div>
              <label className="text-[10px] text-gray-500">エリア名</label>
              <input
                value={selectedArea.name}
                onChange={e => handleUpdateAreaName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs mt-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div><span className="text-gray-500">X: {selectedArea.x}</span></div>
              <div><span className="text-gray-500">Y: {selectedArea.y}</span></div>
              <div><span className="text-gray-500">幅: {selectedArea.width}</span></div>
              <div><span className="text-gray-500">高さ: {selectedArea.height}</span></div>
            </div>
            <div className="text-[10px] text-gray-500">
              配置什器: {selectedArea.fixtureIds.length}台
            </div>
            <button
              onClick={handleDeleteArea}
              className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs text-red-600 border border-red-200 rounded-md hover:bg-red-50 bg-white cursor-pointer"
            >
              <Trash2 size={12} />
              削除
            </button>
          </div>
        )}
      </div>

      {/* Center: Floor plan canvas */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">{plan.name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              plan.status === '確定' ? 'bg-green-100 text-green-700' :
              plan.status === '仮確定' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-200 text-gray-600'
            }`}>
              {plan.status}
            </span>
            <span className="text-xs text-gray-400">({plan.width}×{plan.height})</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTool('select')}
              className={`p-1.5 rounded text-xs border-none cursor-pointer ${
                tool === 'select' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-200 bg-transparent'
              }`}
              title="選択"
            >
              <Move size={14} />
            </button>
            <div className="relative">
              <button
                onClick={() => setTool('add')}
                className={`p-1.5 rounded text-xs border-none cursor-pointer flex items-center gap-1 ${
                  tool === 'add' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-200 bg-transparent'
                }`}
                title="エリア追加"
              >
                <Plus size={14} />
                <Square size={14} />
              </button>
            </div>
            {tool === 'add' && (
              <select
                value={newArea.category}
                onChange={e => setNewArea({ category: e.target.value })}
                className="text-xs border border-gray-300 rounded px-1.5 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500 ml-1"
              >
                {Object.keys(CATEGORY_COLORS).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <select
              value={plan.status}
              onChange={e => handleStatusChange(e.target.value as '作成中' | '仮確定' | '確定')}
              className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="作成中">作成中</option>
              <option value="仮確定">仮確定</option>
              <option value="確定">確定</option>
            </select>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer">
              <ZoomOut size={14} />
            </button>
            <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer">
              <ZoomIn size={14} />
            </button>
            <button onClick={() => setZoom(0.7)} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded bg-transparent border-none cursor-pointer">
              <RotateCcw size={14} />
            </button>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 border-none cursor-pointer">
              <Save size={12} />
              保存
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <svg
            ref={svgRef}
            width={plan.width * zoom}
            height={plan.height * zoom}
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="bg-white border border-gray-300 rounded shadow-sm cursor-crosshair"
            style={{ minWidth: plan.width * zoom, minHeight: plan.height * zoom }}
          >
            {/* Grid */}
            <defs>
              <pattern id="uq-grid" width={GRID_SIZE * zoom} height={GRID_SIZE * zoom} patternUnits="userSpaceOnUse">
                <path d={`M ${GRID_SIZE * zoom} 0 L 0 0 0 ${GRID_SIZE * zoom}`} fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#uq-grid)" />

            {/* UNIQLO Logo watermark */}
            <text
              x={plan.width * zoom / 2}
              y={plan.height * zoom / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={60 * zoom}
              fontWeight="900"
              fill="#f0f0f0"
              className="pointer-events-none select-none"
            >
              UNIQLO
            </text>

            {/* Floor areas */}
            {plan.areas.map(area => {
              const x = area.x * zoom;
              const y = area.y * zoom;
              const w = area.width * zoom;
              const h = area.height * zoom;
              const isSelected = selectedAreaId === area.id;

              return (
                <g key={area.id}>
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    fill={area.color}
                    stroke={isSelected ? '#DC2626' : '#9CA3AF'}
                    strokeWidth={isSelected ? 2 : 1}
                    rx={3}
                    opacity={0.8}
                    className="cursor-move"
                    onMouseDown={e => handleAreaMouseDown(e, area)}
                  />
                  {/* Area name */}
                  <text
                    x={x + w / 2}
                    y={y + h / 2 - 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.max(10, 12 * zoom)}
                    fontWeight="600"
                    fill="#374151"
                    className="pointer-events-none select-none"
                  >
                    {area.name}
                  </text>
                  {/* Category */}
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.max(8, 9 * zoom)}
                    fill="#6B7280"
                    className="pointer-events-none select-none"
                  >
                    {area.category}
                  </text>
                  {/* Fixture count */}
                  {area.fixtureIds.length > 0 && (
                    <text
                      x={x + w / 2}
                      y={y + h / 2 + 20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={Math.max(7, 8 * zoom)}
                      fill="#9CA3AF"
                      className="pointer-events-none select-none"
                    >
                      什器 {area.fixtureIds.length}台
                    </text>
                  )}

                  {/* Resize handle */}
                  {isSelected && (
                    <rect
                      x={x + w - 8}
                      y={y + h - 8}
                      width={8}
                      height={8}
                      fill="#DC2626"
                      className="cursor-se-resize"
                      onMouseDown={e => handleResizeMouseDown(e, area)}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Panel: Fixture assignment */}
      <div className="w-52 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-3 py-2 border-b border-gray-200 bg-red-50">
          <h2 className="text-xs font-semibold text-gray-700">什器配置</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {storeFixtures.map(f => (
            <div key={f.id} className="p-2 rounded-md bg-gray-50 text-xs">
              <div className="font-medium text-gray-700 truncate">{f.name}</div>
              <div className="text-gray-400 mt-0.5">{f.type} / {f.category}</div>
              <div className="text-gray-400">容量: {f.capacity}点</div>
            </div>
          ))}
          {storeFixtures.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">什器がありません</p>
          )}
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <h3 className="text-[10px] font-semibold text-gray-500 uppercase">凡例</h3>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(CATEGORY_COLORS).slice(0, 10).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1 text-[10px]">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                <span className="text-gray-600 truncate">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
