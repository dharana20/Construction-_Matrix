import React from 'react';
import { X, BookOpen, CheckCircle, AlertTriangle, ShieldCheck, Calculator } from 'lucide-react';

export default function EngineeringGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 border-amber-500/30 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-700/60">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              IS 456 & IS 2502 Civil Engineering Reference Guide
            </h2>
            <p className="text-xs text-slate-400">
              Technical rules of thumb for structural steel & binding wire estimation in India
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          
          {/* Section 1 */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" /> 1. Steel Rod Weight Standard Formula ($d^2 / 162$)
            </h3>
            <p className="mb-2">
              The weight of steel rebar per meter length is derived using the steel density factor ($7850 \text{ kg/m}^3$):
            </p>
            <div className="bg-slate-950 p-2.5 rounded font-mono text-amber-300 text-[11px] mb-2">
              Weight per Meter (kg/m) = (Diameter in mm)² / 162.28
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>8mm TMT:</strong> 0.395 kg/m &rarr; 12m bar = 4.74 kg</li>
              <li><strong>10mm TMT:</strong> 0.617 kg/m &rarr; 12m bar = 7.40 kg</li>
              <li><strong>12mm TMT:</strong> 0.888 kg/m &rarr; 12m bar = 10.66 kg</li>
              <li><strong>16mm TMT:</strong> 1.578 kg/m &rarr; 12m bar = 18.94 kg</li>
              <li><strong>20mm TMT:</strong> 2.469 kg/m &rarr; 12m bar = 29.63 kg</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> 2. Steel Binding Wire Standard Rule
            </h3>
            <p className="mb-2">
              As per Indian civil construction guidelines (IS 2502 Code of Practice for Bending and Fixing of Bars):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 mb-2">
              <li><strong>Binding Wire Benchmark:</strong> 10 kg to 13 kg of binding wire per Metric Ton (1000 kg) of rebar.</li>
              <li><strong>Gauge Selection:</strong> 18 SWG (1.2mm) is standard for columns/beams. 20 SWG (0.9mm) is preferred for slab mesh tying.</li>
              <li><strong>Annealed Mild Steel:</strong> Soft annealed black wire prevents wire snapping during bar tying.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-emerald-400" /> 3. Lap Length & Wastage Optimization
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>Column Lap Length:</strong> $50d$ (where $d$ is bar diameter). e.g., for 16mm bar, lap length = $50 \times 16 = 800\text{ mm}$ ($80\text{ cm}$).</li>
              <li><strong>Stirrup Hook Length:</strong> $10d$ or $75\text{ mm}$ minimum for earthquake resistance 135° hooks.</li>
              <li><strong>Standard Wastage:</strong> Always add 3% to 5% for cut pieces & offcuts.</li>
            </ul>
          </div>

        </div>

        <div className="mt-5 pt-3 border-t border-slate-700/60 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
}
