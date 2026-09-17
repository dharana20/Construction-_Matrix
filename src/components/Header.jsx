import React from 'react';
import { HardHat, Download, BookOpen, RefreshCw, Layers } from 'lucide-react';

export default function Header({ onExportPDF, onOpenGuide, onReset }) {
  return (
    <header className="glass-panel p-4 sm:p-5 mb-6 sticky top-2 z-40 border-b border-amber-500/20 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Main Title */}
        <div className="flex items-center space-x-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-amber-400/40">
              <HardHat className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-400 via-orange-300 to-amber-100 bg-clip-text text-transparent tracking-tight">
                  Construction Matrix
                </h1>
                <span className="badge-orange text-[10px] sm:text-xs px-2.5 py-0.5 font-bold uppercase tracking-wide">
                  Pro Engine v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Steel Wires, TMT Rebar & Infrastructure Cost Estimator (₹ INR)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons for Mobile & Laptop */}
        <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-stretch md:justify-end">
          <button
            onClick={onOpenGuide}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>IS Codes Guide</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
            title="Reset to default inputs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={onExportPDF}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-slate-950 shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Export Official PDF Report</span>
          </button>
        </div>

      </div>
    </header>
  );
}
