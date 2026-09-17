import React from 'react';
import { formatIndianRupees } from '../utils/calculator';
import { Cable, Layers, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';

export default function SteelWireBreakdown({ results }) {
  const { rodBreakdown, bindingWireSummary, costSummary, inputs } = results;

  return (
    <div className="space-y-6 mb-6">
      
      {/* 1. Binding Wire Detailed Breakdown Box */}
      <div className="glass-panel p-5 border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2">
              <Cable className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                Steel Binding Wire Requirements Breakdown
              </h3>
              <span className="badge-blue text-[10px]">Gauge {bindingWireSummary.wireGauge} SWG</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Annealed black/GI binding wire used to tie column-beam junction rebar laps & stirrups.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Estimated Binding Wire Cost</span>
            <span className="text-lg font-extrabold text-cyan-300">
              {formatIndianRupees(costSummary.totalBindingWireCost)}
            </span>
          </div>
        </div>

        {/* Wire Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Total Wire Weight</span>
            <span className="text-xl font-bold text-slate-100 mt-1 block">
              {bindingWireSummary.totalBindingWireKg} <span className="text-xs text-slate-400 font-normal">kg</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">~{inputs.bindingWireKgPerTon} kg per Ton of Steel</span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Coils / Rolls Needed</span>
            <span className="text-xl font-bold text-cyan-300 mt-1 block">
              {bindingWireSummary.totalBindingWireRolls} <span className="text-xs text-slate-400 font-normal">coils</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Standard {bindingWireSummary.bundleWeightKg}kg coil weight</span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Total Wire Length</span>
            <span className="text-xl font-bold text-slate-100 mt-1 block">
              {bindingWireSummary.totalBindingWireMeters.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-slate-400 font-normal">meters</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              ({bindingWireSummary.totalBindingWireFeet.toLocaleString('en-IN')} feet)
            </span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Wire Gauge Yield</span>
            <span className="text-xl font-bold text-amber-300 mt-1 block">
              {bindingWireSummary.metersPerKg} <span className="text-xs text-slate-400 font-normal">m/kg</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {bindingWireSummary.wireGauge === '18' ? '1.2mm 18 SWG Wire' : '0.9mm 20 SWG Wire'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Rebar Steel Rods Diameter-Wise Table */}
      <div className="glass-panel p-5 border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                Diameter-wise TMT Steel Rod & Wire Bar Breakdown
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Calculated per IS 456 standard unit weight formula: <code className="text-amber-300 font-mono">W = d²/162 kg/m</code>
            </p>
          </div>
          <span className="badge-orange text-xs">Standard 12 Meter Bar Lengths</span>
        </div>

        {/* Table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                <th className="p-3">Diameter</th>
                <th className="p-3">Weight Ratio</th>
                <th className="p-3">Total Weight</th>
                <th className="p-3">Unit Weight (12m Rod)</th>
                <th className="p-3">12m Rods Count</th>
                <th className="p-3">Bundle Count</th>
                <th className="p-3">Structural Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {rodBreakdown.map((item) => (
                <tr key={item.dia} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-100">
                    <span className="inline-block w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-center leading-6 font-extrabold mr-2">
                      {item.dia}
                    </span>
                    {item.dia} mm TMT
                  </td>
                  <td className="p-3 text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>{item.ratioPercent}%</span>
                      <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: `${item.ratioPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-slate-100">
                    {item.weightKg.toLocaleString('en-IN')} kg{' '}
                    <span className="text-[10px] text-slate-400">({item.weightTons} MT)</span>
                  </td>
                  <td className="p-3 text-slate-300">
                    {item.kgPer12mRod} kg / rod <span className="text-[10px] text-slate-500">({item.kgPerMeter} kg/m)</span>
                  </td>
                  <td className="p-3 font-extrabold text-amber-400 text-sm">
                    {item.totalRods} <span className="text-xs font-semibold text-slate-400">rods</span>
                  </td>
                  <td className="p-3 text-cyan-300 font-bold">
                    {item.totalBundles} <span className="text-[10px] text-slate-400 font-normal">({item.bundleSize} pcs/bundle)</span>
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">
                    {item.useCase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
