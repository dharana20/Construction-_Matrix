import React from 'react';
import { CALCULATION_PRESETS } from '../utils/calculator';
import { Sparkles, Train, Building2, Home, Landmark } from 'lucide-react';

export default function PresetBar({ activePresetId, onSelectPreset }) {
  return (
    <div className="glass-panel p-4 mb-6 border-amber-500/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Quick Construction Presets (Residential, Commercial & Railway Bridges)
          </h3>
        </div>
        <span className="text-xs text-slate-400">1-Click load presets for instant calculations</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CALCULATION_PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          const isInfra = preset.category === 'infrastructure';

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? isInfra
                    ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-slate-900 border-cyan-500/60 ring-1 ring-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-slate-900 border-amber-500/60 ring-1 ring-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700/60 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    {preset.title}
                  </span>
                  {isSelected && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                      isInfra ? 'bg-cyan-400 text-slate-950' : 'bg-amber-400 text-slate-950'
                    }`}>
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1.5 flex-wrap">
                  <span>{preset.plotArea} {preset.unit}</span>
                  <span>•</span>
                  <span>{isInfra ? 'Pier Spans' : 'Floors'}: {preset.floors}</span>
                  <span>•</span>
                  <span>{isInfra ? 'Girders/Bays' : 'Rooms'}: {preset.rooms}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
