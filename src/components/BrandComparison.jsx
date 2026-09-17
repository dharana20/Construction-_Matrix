import React from 'react';
import { STEEL_BRANDS, formatIndianRupees } from '../utils/calculator';
import { ShieldAlert, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function BrandComparison({ currentRate, onSelectBrand, totalSteelKg }) {
  return (
    <div className="glass-panel p-5 mb-6 border-slate-700/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Indian TMT Steel Brand Cost & Quality Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare Tata Tiscon, JSW Neosteel, Jindal Panther & other major TMT brands for {totalSteelKg.toLocaleString('en-IN')} kg of steel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STEEL_BRANDS.map((brand) => {
          const brandTotalCost = totalSteelKg * brand.ratePerKg;
          const isCurrentSelected = currentRate === brand.ratePerKg;

          return (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isCurrentSelected
                  ? 'bg-amber-500/10 border-amber-500 shadow-lg ring-1 ring-amber-500/40'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-100">{brand.name}</span>
                  <span className="text-xs font-extrabold text-amber-400">₹ {brand.ratePerKg}/kg</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="badge-orange text-[10px]">{brand.qualityTier}</span>
                  <span className="text-slate-400 font-medium">Ductility: {brand.ductileScore}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Total Brand Rebar Cost</span>
                  <span className="text-xs font-bold text-slate-200">{formatIndianRupees(brandTotalCost)}</span>
                </div>

                <button
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                    isCurrentSelected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCurrentSelected ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-slate-950" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <>
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
