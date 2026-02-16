import { useState } from 'react';
import type { Gondola, Product } from '../../types';
import { Trash2, Plus, Minus } from 'lucide-react';

interface GondolaViewProps {
  gondola: Gondola;
  zoom: number;
  dragProduct: Product | null;
  onDropProduct: (shelfId: string, product: Product) => void;
  onRemoveProduct: (shelfId: string, spId: string) => void;
  onUpdateFacing: (shelfId: string, spId: string, facing: number) => void;
}

const SCALE = 0.5; // mm to px

export default function GondolaView({
  gondola,
  zoom,
  dragProduct,
  onDropProduct,
  onRemoveProduct,
  onUpdateFacing,
}: GondolaViewProps) {
  const [hoverShelf, setHoverShelf] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const gWidth = gondola.width * SCALE;
  const gHeight = gondola.height * SCALE;

  const handleDragOver = (e: React.DragEvent, shelfId: string) => {
    e.preventDefault();
    setHoverShelf(shelfId);
  };

  const handleDragLeave = () => {
    setHoverShelf(null);
  };

  const handleDrop = (e: React.DragEvent, shelfId: string) => {
    e.preventDefault();
    setHoverShelf(null);
    if (dragProduct) {
      onDropProduct(shelfId, dragProduct);
    }
  };

  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Gondola frame */}
      <div
        className="relative bg-amber-50 border-2 border-amber-800 rounded-sm"
        style={{ width: gWidth + 8, height: gHeight + 8, padding: 4 }}
      >
        {/* Gondola label */}
        <div className="absolute -top-6 left-0 text-xs font-medium text-gray-600">
          {gondola.name} ({gondola.width}mm × {gondola.height}mm)
        </div>

        {/* Shelves */}
        {gondola.shelves.map((shelf) => {
          const shelfY = shelf.y * SCALE;
          const shelfH = shelf.height * SCALE;
          const shelfW = shelf.width * SCALE;
          const isDropTarget = hoverShelf === shelf.id;

          return (
            <div
              key={shelf.id}
              className={`absolute left-1 transition-colors ${
                isDropTarget ? 'bg-blue-100 border-blue-400' : 'bg-white border-amber-300'
              } border-b-2 border-l border-r`}
              style={{
                top: shelfY,
                width: shelfW,
                height: shelfH,
              }}
              onDragOver={(e) => handleDragOver(e, shelf.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, shelf.id)}
            >
              {/* Shelf number label */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono">
                {shelf.shelfNumber}段
              </div>

              {/* Products on shelf */}
              <div className="absolute bottom-0 left-0 flex items-end h-full">
                {shelf.products.map((sp) => {
                  const pWidth = sp.product.width * sp.facing * SCALE;
                  const pHeight = Math.min(sp.product.height * SCALE, shelfH - 2);
                  const isSelected = selectedProduct === sp.id;

                  return (
                    <div
                      key={sp.id}
                      className={`relative cursor-pointer transition-all group ${
                        isSelected ? 'ring-2 ring-blue-500 z-10' : ''
                      }`}
                      style={{
                        width: pWidth,
                        height: pHeight,
                        backgroundColor: sp.product.color,
                        opacity: 0.85,
                        borderRight: '1px solid rgba(0,0,0,0.1)',
                      }}
                      onClick={() => setSelectedProduct(isSelected ? null : sp.id)}
                      title={`${sp.product.name}\nフェイス: ${sp.facing} / 段積: ${sp.stacking}\n売価: ¥${sp.product.price}`}
                    >
                      {/* Product label */}
                      {pWidth > 30 && pHeight > 20 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-0.5 overflow-hidden">
                          <span className="text-[8px] font-medium text-white leading-tight text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] truncate w-full px-0.5">
                            {sp.product.name.length > 6 ? sp.product.name.substring(0, 6) + '..' : sp.product.name}
                          </span>
                          <span className="text-[7px] text-white/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                            ×{sp.facing}
                          </span>
                        </div>
                      )}

                      {/* Facing indicators */}
                      {sp.facing > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 flex">
                          {Array.from({ length: sp.facing }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 border-r border-white/30 last:border-r-0"
                              style={{ height: 2, backgroundColor: 'rgba(255,255,255,0.3)' }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Hover controls */}
                      {isSelected && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white rounded shadow-md px-1 py-0.5 z-20">
                          <button
                            onClick={(e) => { e.stopPropagation(); onUpdateFacing(shelf.id, sp.id, sp.facing - 1); }}
                            className="p-0.5 text-gray-500 hover:text-blue-600 bg-transparent border-none cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-[9px] text-gray-700 mx-0.5">{sp.facing}F</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); onUpdateFacing(shelf.id, sp.id, sp.facing + 1); }}
                            className="p-0.5 text-gray-500 hover:text-blue-600 bg-transparent border-none cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onRemoveProduct(shelf.id, sp.id); }}
                            className="p-0.5 text-gray-500 hover:text-red-600 bg-transparent border-none cursor-pointer ml-0.5"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Shelf plate (visual) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-amber-700"
                style={{ height: 3 }}
              />
            </div>
          );
        })}

        {/* Left side frame */}
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-800 rounded-l" />
        {/* Right side frame */}
        <div className="absolute top-0 right-0 w-1 h-full bg-amber-800 rounded-r" />
      </div>

      {/* Dimension labels */}
      <div className="flex justify-between mt-1 text-[10px] text-gray-400">
        <span>0mm</span>
        <span>{gondola.width}mm</span>
      </div>
    </div>
  );
}
