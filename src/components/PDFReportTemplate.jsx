import React from 'react';
import { formatIndianRupees, formatShortRupees } from '../utils/calculator';

export default function PDFReportTemplate({ results }) {
  const { inputs, steelSummary, bindingWireSummary, rodBreakdown, costSummary } = results;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div id="pdf-report-container" className="p-8 bg-slate-950 text-slate-100 font-sans border-2 border-amber-500/30 rounded-2xl max-w-4xl mx-auto my-4 shadow-2xl">
      
      {/* Header */}
      <div className="flex justify-between items-start pb-6 mb-6 border-b-2 border-amber-500/40">
        <div>
          <h1 className="text-2xl font-black text-amber-400 uppercase tracking-wide">
            Construction Matrix
          </h1>
          <h2 className="text-sm font-extrabold text-slate-200 mt-0.5">
            Structural Steel Wires & Cost Estimation Report
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Standard IS 456:2000, IS 2502 & IRS Concrete Bridge Code BOQ
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30 block mb-1 font-bold">
            Official Calculation Report
          </span>
          <span className="text-xs text-slate-400">Date: {currentDate}</span>
        </div>
      </div>

      {/* Project Parameters Matrix */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block">Plot / Span Area:</span>
          <span className="font-bold text-slate-100">{inputs.plotArea} {inputs.unitSymbol}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Total Built-up Area:</span>
          <span className="font-bold text-amber-400">{inputs.totalBuiltUpArea} sq ft</span>
        </div>
        <div>
          <span className="text-slate-400 block">{inputs.isInfra ? 'Pier Spans & Bays:' : 'Floors & Rooms:'}</span>
          <span className="font-bold text-slate-100">{inputs.floors} {inputs.isInfra ? 'Spans' : 'Floor(s)'} | {inputs.rooms} {inputs.isInfra ? 'Bays' : 'Rooms'}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Steel Grade / Soil:</span>
          <span className="font-bold text-cyan-400 uppercase">{inputs.steelGrade} | {inputs.soilCondition}</span>
        </div>
      </div>

      {/* Hero Summary Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Total TMT Rebar Steel</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            {steelSummary.totalSteelTons} MT
          </span>
          <span className="text-[11px] text-slate-400">({steelSummary.totalSteelKgWithWastage.toLocaleString('en-IN')} kg)</span>
        </div>

        <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Total Steel Binding Wires</span>
          <span className="text-2xl font-black text-cyan-300 mt-1 block">
            {bindingWireSummary.totalBindingWireKg} kg
          </span>
          <span className="text-[11px] text-slate-400">({bindingWireSummary.totalBindingWireRolls} coils / {bindingWireSummary.wireGauge} SWG)</span>
        </div>

        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Grand Total Cost (₹)</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            ₹ {costSummary.grandTotalInLakhs} Lakhs
          </span>
          <span className="text-[11px] text-slate-400">({formatIndianRupees(costSummary.grandTotalCost)})</span>
        </div>
      </div>

      {/* BOQ Table */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
          Itemized Steel & Wire Bill of Quantities (BOQ)
        </h3>
        <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
            <tr>
              <th className="p-3">Item Description</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Rate (₹)</th>
              <th className="p-3 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="p-3 font-semibold">TMT Structural Rebar Steel ({inputs.steelGrade.toUpperCase()})</td>
              <td className="p-3">{steelSummary.totalSteelKgWithWastage.toLocaleString('en-IN')}</td>
              <td className="p-3">Kg</td>
              <td className="p-3">₹{inputs.steelRate} / kg</td>
              <td className="p-3 text-right font-bold text-slate-100">{formatIndianRupees(costSummary.totalRebarSteelCost)}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">
                Steel Binding Wire ({bindingWireSummary.wireGauge} SWG Tying Wire)
              </td>
              <td className="p-3">{bindingWireSummary.totalBindingWireKg}</td>
              <td className="p-3">Kg ({bindingWireSummary.totalBindingWireRolls} coils)</td>
              <td className="p-3">₹{inputs.effectiveBindingWireRate} / kg</td>
              <td className="p-3 text-right font-bold text-cyan-300">{formatIndianRupees(costSummary.totalBindingWireCost)}</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Steel Cutting, Bending & Cage Assembly Labour</td>
              <td className="p-3">{steelSummary.totalSteelKgWithWastage.toLocaleString('en-IN')}</td>
              <td className="p-3">Kg</td>
              <td className="p-3">₹{inputs.laborRate} / kg</td>
              <td className="p-3 text-right font-bold text-emerald-300">{formatIndianRupees(costSummary.totalLaborCost)}</td>
            </tr>
            <tr className="bg-slate-900/80 font-bold text-slate-100 text-sm">
              <td className="p-3" colSpan="4">ESTIMATED GRAND TOTAL COST (INR)</td>
              <td className="p-3 text-right text-emerald-400">{formatIndianRupees(costSummary.grandTotalCost)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Diameter breakdown preview */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Diameter-wise Bar Schedule (12 Meter Standard Rods)
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {rodBreakdown.map((r) => (
            <div key={r.dia} className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="font-bold text-amber-400 block">{r.dia}mm TMT</span>
              <span className="text-[11px] text-slate-300 block">{r.totalRods} rods</span>
              <span className="text-[10px] text-slate-500">({r.totalBundles} bndl)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Signoff */}
      <div className="pt-4 border-t border-slate-800 flex justify-between items-end text-xs text-slate-500">
        <div>
          <span>Generated by Construction Matrix Estimation Engine</span>
          <br />
          <span>Calculations per IS 456:2000, IS 2502 & IRS Bridge Specifications</span>
        </div>
        <div className="text-right border-t border-dashed border-slate-700 pt-3 w-44">
          <span className="block text-slate-400 font-bold">Authorized Signatory</span>
        </div>
      </div>

    </div>
  );
}
