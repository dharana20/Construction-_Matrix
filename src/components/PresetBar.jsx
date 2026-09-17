import React from 'react';
import { CALCULATION_PRESETS } from '../utils/calculator';
import { Sparkles } from 'lucide-react';

export default function PresetBar({ activePresetId, onSelectPreset }) {
  return (
    <div className="glass-panel p-6 sm:p-7 mb-10 sm:mb-12 border-amber-500/15 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-wide">
            Quick Construction Presets (Residential, Commercial & Railway Bridges)
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">1-Click load presets for instant calculations</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CALCULATION_PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          const isInfra = preset.category === 'infrastructure';

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? isInfra
                    ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-slate-900 border-cyan-500/70 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-500/10 scale-[1.01]'
                    : 'bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-slate-900 border-amber-500/70 ring-2 ring-amber-500/40 shadow-xl shadow-amber-500/10 scale-[1.01]'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-700/60 text-slate-300 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm sm:text-base text-slate-100 flex items-center gap-1.5">
                    {preset.title}
                  </span>
                  {isSelected && (
                    <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                      isInfra ? 'bg-cyan-400 text-slate-950' : 'bg-amber-400 text-slate-950'
                    }`}>
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-2 flex-wrap font-medium">
                  <span className="bg-slate-950/60 px-2 py-1 rounded">{preset.plotArea} {preset.unit}</span>
                  <span>•</span>
                  <span>{isInfra ? 'Pier Spans' : 'Floors'}: {preset.floors}</span>
                  <span>•</span>
                  <span>{isInfra ? 'Girder Bays' : 'Rooms'}: {preset.rooms}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
