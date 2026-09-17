import React from 'react';
import { formatIndianRupees, formatShortRupees } from '../utils/calculator';
import { Weight, Cable, IndianRupee, Layers, CheckCircle2, TrendingUp } from 'lucide-react';

export default function SummaryCards({ results }) {
  const { steelSummary, bindingWireSummary, costSummary, inputs } = results;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Structural Rebar Steel */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-amber-500/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Weight className="w-4 h-4" /> TMT Structural Steel
          </span>
          <span className="badge-orange text-[11px] font-extrabold">{steelSummary.totalSteelTons} MT</span>
        </div>

        <div className="mb-2">
          <div className="text-2xl lg:text-3xl font-black text-slate-100 glow-text-orange tracking-tight">
            {steelSummary.totalSteelKgWithWastage.toLocaleString('en-IN')}{' '}
            <span className="text-base font-semibold text-slate-400">kg</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            Approx <span className="text-amber-300 font-bold">{steelSummary.totalRods12m}</span> standard 12m steel rods ({steelSummary.totalRodsBundles} bundles)
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
          <span>Includes {inputs.wastagePercent}% wastage ({steelSummary.wastageKg} kg)</span>
        </div>
      </div>

      {/* 2. Steel Binding Wire */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-cyan-500/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cable className="w-4 h-4" /> Steel Binding Wires
          </span>
          <span className="badge-blue text-[11px] font-extrabold">{bindingWireSummary.totalBindingWireRolls} Coils</span>
        </div>

        <div className="mb-2">
          <div className="text-2xl lg:text-3xl font-black text-slate-100 glow-text-cyan tracking-tight">
            {bindingWireSummary.totalBindingWireKg}{' '}
            <span className="text-base font-semibold text-slate-400">kg</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            Gauge {bindingWireSummary.wireGauge} Annealed Wire ({bindingWireSummary.totalBindingWireMeters.toLocaleString('en-IN')} meters)
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
          <span>~{inputs.bindingWireKgPerTon} kg wire per Metric Ton of steel</span>
          <span className="text-cyan-300 font-semibold">{bindingWireSummary.totalBindingWireFeet.toLocaleString('en-IN')} ft</span>
        </div>
      </div>

      {/* 3. Total Cost Estimation (INR ₹) */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-emerald-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4" /> Estimated Total Cost
          </span>
          <span className="badge-emerald text-[11px] font-extrabold">
            ₹ {costSummary.grandTotalInLakhs} Lakhs
          </span>
        </div>

        <div className="mb-2">
          <div className="text-2xl lg:text-3xl font-black text-emerald-400 tracking-tight">
            {formatIndianRupees(costSummary.grandTotalCost)}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            Steel + Wire + Bending Fitting Labour
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
          <span>Rebar: {formatShortRupees(costSummary.totalRebarSteelCost)}</span>
          <span>Wire: {formatShortRupees(costSummary.totalBindingWireCost)}</span>
        </div>
      </div>

      {/* 4. Cost Per Sq. Ft */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-amber-400/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> Steel Cost / Sq Ft
          </span>
          <span className="text-xs text-slate-400">{inputs.totalBuiltUpArea} sq ft</span>
        </div>

        <div className="mb-2">
          <div className="text-2xl lg:text-3xl font-black text-slate-100 tracking-tight">
            ₹ {costSummary.costPerSqFt}{' '}
            <span className="text-base font-semibold text-slate-400">/ sq ft</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            Average Indian RCC Benchmark: ₹180 - ₹280/sq ft
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
          <span>Labor component: ₹{inputs.laborRate}/kg</span>
          <span className="text-emerald-400 font-semibold">Optimal</span>
        </div>
      </div>

    </div>
  );
}
