import React from 'react';
import { HardHat, Download, BookOpen, RefreshCw } from 'lucide-react';

export default function Header({ onExportPDF, onOpenGuide, onReset }) {
  return (
    <header className="glass-panel p-5 sm:p-6 mb-10 sm:mb-14 sticky top-3 z-40 border-b border-amber-500/20 shadow-2xl backdrop-blur-xl">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Logo & Main Title */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-amber-400/40">
              <HardHat className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-300 to-amber-100 bg-clip-text text-transparent tracking-tight">
                  Construction Matrix
                </h1>
                <span className="badge-orange text-[10px] sm:text-xs px-3 py-0.5 font-bold uppercase tracking-wide">
                  Pro Engine v2.5
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                Steel Wires, TMT Rebar & Infrastructure Cost Estimator (₹ INR)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-3.5 w-full md:w-auto justify-end">
          <button
            onClick={onOpenGuide}
            className="flex items-center justify-center gap-2 px-4.5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>IS Codes Guide</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all shadow-md"
            title="Reset to default inputs"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={onExportPDF}
            className="flex items-center justify-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-extrabold rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-slate-950 shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
            <span>Export Official PDF Report</span>
          </button>
        </div>

      </div>
    </header>
  );
}
