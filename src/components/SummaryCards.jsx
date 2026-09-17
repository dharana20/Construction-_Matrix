import React from 'react';
import { formatIndianRupees, formatShortRupees } from '../utils/calculator';
import { Weight, Cable, IndianRupee, TrendingUp } from 'lucide-react';

export default function SummaryCards({ results }) {
  const { steelSummary, bindingWireSummary, costSummary, inputs } = results;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-10 sm:mb-12">
      
      {/* 1. Structural Steel Weight */}
      <div className="glass-panel p-6 sm:p-7 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Weight className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="badge-orange text-xs px-3 py-1 font-bold">
            {steelSummary.totalSteelTons} MT
          </span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          TMT Structural Steel
        </h3>
        <div className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {steelSummary.totalSteelKgWithWastage.toLocaleString('en-IN')}{' '}
          <span className="text-sm font-semibold text-slate-400">kg</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between font-medium">
          <span>Approx {steelSummary.totalRodsCount.toLocaleString('en-IN')} rods</span>
          <span className="text-amber-400 font-semibold">({steelSummary.totalBundles} bundles)</span>
        </div>
      </div>

      {/* 2. Steel Binding Wires Requirement */}
      <div className="glass-panel p-6 sm:p-7 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <Cable className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="badge-blue text-xs px-3 py-1 font-bold">
            {bindingWireSummary.totalBindingWireRolls} Coils
          </span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Steel Binding Wires
        </h3>
        <div className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {bindingWireSummary.totalBindingWireKg}{' '}
          <span className="text-sm font-semibold text-slate-400">kg</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between font-medium">
          <span>Gauge {bindingWireSummary.wireGauge} SWG</span>
          <span className="text-cyan-300 font-semibold">({bindingWireSummary.totalWireMeters.toLocaleString('en-IN')} meters)</span>
        </div>
      </div>

      {/* 3. Estimated Grand Total Cost */}
      <div className="glass-panel p-6 sm:p-7 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <IndianRupee className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">
            ₹ {costSummary.grandTotalInLakhs} Lakhs
          </span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Estimated Total Cost
        </h3>
        <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
          {formatIndianRupees(costSummary.grandTotalCost)}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between font-medium">
          <span>Steel: {formatShortRupees(costSummary.totalRebarSteelCost)}</span>
          <span className="text-emerald-300 font-semibold">Wire: ₹{costSummary.totalBindingWireCost.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* 4. Unit Benchmark Price Per Sq Ft */}
      <div className="glass-panel p-6 sm:p-7 border-slate-600/40 hover:border-slate-500 transition-all duration-300 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl group-hover:bg-slate-500/20 transition-all"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400">
            <TrendingUp className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 font-bold">
            {inputs.totalBuiltUpArea} sq ft
          </span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Steel Cost / Sq Ft
        </h3>
        <div className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          ₹ {costSummary.costPerSqFt}{' '}
          <span className="text-sm font-semibold text-slate-400">/ sq ft</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between font-medium">
          <span>Avg Indian Benchmark: ₹180 - ₹280/sq ft</span>
        </div>
      </div>

    </div>
  );
}
