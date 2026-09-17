import React, { useState } from 'react';
import { Eye, Layers, Grid, Cable, Sparkles, Building, Train, ShieldCheck } from 'lucide-react';

export default function StructuralVisualizer({ results }) {
  const [viewMode, setViewMode] = useState('elevation');
  const { inputs, steelSummary, bindingWireSummary } = results;

  const numFloors = inputs.floors;
  const numRooms = inputs.rooms;
  const isInfra = inputs.isInfra;

  return (
    <div className="glass-panel p-5 mb-6 border-amber-500/20">
      
      {/* Visualizer Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            {isInfra ? (
              <Train className="w-5 h-5 text-cyan-400" />
            ) : (
              <Building className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              {isInfra
                ? 'Railway Bridge & Viaduct Structural Steel Simulator'
                : 'Interactive Building Structural Steel & Wire Frame Simulator'}
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold animate-pulse ${
              isInfra ? 'bg-cyan-500 text-slate-950' : 'bg-amber-500 text-slate-950'
            }`}>
              {isInfra ? 'IRS Bridge Mode' : 'IS 456 Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isInfra
              ? `Dynamic rendering of Railway Pier Columns, Pier Caps, Prestressed Girders, and GI Binding Wires.`
              : `Real-time rendering of columns, beam grids, slab mesh, and binding wire tie joints for ${numFloors} floor(s).`}
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('elevation')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'elevation'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isInfra ? 'Bridge Span Elevation' : 'Building Elevation'}</span>
          </button>

          <button
            onClick={() => setViewMode('floorplan')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'floorplan'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{isInfra ? 'Pier Cap & Girder Grid' : 'Room & Beam Grid'}</span>
          </button>

          <button
            onClick={() => setViewMode('wirejoint')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'wirejoint'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cable className="w-3.5 h-3.5" />
            <span>{isInfra ? '32mm Bar & GI Wire Knot' : 'Binding Joint Zoom'}</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="relative w-full h-[380px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* ----------------- INFRASTRUCTURE / RAILWAY BRIDGE ELEVATION MODE ----------------- */}
        {isInfra && viewMode === 'elevation' && (
          <div className="w-full h-full flex flex-col justify-end items-center relative py-2">
            
            <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-2">
              <Train className="w-3.5 h-3.5 text-cyan-400" />
              <span>Railway Track & Bridge Span Viaduct Elevation</span>
            </div>

            <div className="w-full max-w-xl h-[280px] flex flex-col justify-end relative">
              
              {/* Railway Track Deck Top */}
              <div className="w-full h-8 bg-slate-900 border-2 border-cyan-500/80 rounded-t-lg relative flex items-center justify-between px-4">
                {/* Rails */}
                <div className="absolute inset-x-0 top-1 h-1 bg-amber-400 shadow-sm shadow-amber-400"></div>
                <div className="absolute inset-x-0 top-3 h-1 bg-amber-400 shadow-sm shadow-amber-400"></div>
                <span className="text-[10px] text-cyan-300 font-extrabold z-10 bg-slate-950/80 px-2 rounded">
                  Railway Ballast Track & Deck Slab
                </span>
                <span className="text-[10px] text-amber-300 font-bold z-10">
                  Prestressed Girders
                </span>
              </div>

              {/* Heavy Pier Cap Beam */}
              <div className="w-full h-6 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 border-x-2 border-amber-300 flex items-center justify-around px-2 relative">
                <div className="wire-animated inset-0 absolute border-y border-cyan-400"></div>
                <span className="text-[9px] font-mono text-slate-950 font-black z-10">
                  HEAVY RCC PIER CAP (32mm REBAR + GI WIRE)
                </span>
              </div>

              {/* Railway Pier Columns */}
              <div className="w-full h-44 flex items-center justify-around px-8 bg-slate-900/40 relative">
                
                {/* Left Pier */}
                <div className="w-12 h-full bg-slate-800 border-x-4 border-orange-500 flex flex-col justify-between py-2 relative">
                  <div className="text-[8px] text-amber-300 text-center font-bold">PIER 1</div>
                  {/* Rebar Cage vertical lines */}
                  <div className="absolute inset-y-0 left-2 w-0.5 bg-amber-400"></div>
                  <div className="absolute inset-y-0 right-2 w-0.5 bg-amber-400"></div>
                  {/* GI Wire nodes */}
                  <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -left-1.5 top-1/4 shadow-md shadow-cyan-400 animate-ping"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -right-1.5 top-3/4 shadow-md shadow-cyan-400 animate-ping"></div>
                </div>

                {/* Center Pier */}
                <div className="w-12 h-full bg-slate-800 border-x-4 border-orange-500 flex flex-col justify-between py-2 relative">
                  <div className="text-[8px] text-amber-300 text-center font-bold">PIER 2</div>
                  <div className="absolute inset-y-0 left-2 w-0.5 bg-amber-400"></div>
                  <div className="absolute inset-y-0 right-2 w-0.5 bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -left-1.5 top-1/2 shadow-md shadow-cyan-400 animate-ping"></div>
                </div>

                {/* Right Pier */}
                <div className="w-12 h-full bg-slate-800 border-x-4 border-orange-500 flex flex-col justify-between py-2 relative">
                  <div className="text-[8px] text-amber-300 text-center font-bold">PIER 3</div>
                  <div className="absolute inset-y-0 left-2 w-0.5 bg-amber-400"></div>
                  <div className="absolute inset-y-0 right-2 w-0.5 bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -right-1.5 top-1/3 shadow-md shadow-cyan-400 animate-ping"></div>
                </div>

              </div>

              {/* Deep Water Pile Foundation */}
              <div className="w-full h-12 bg-gradient-to-t from-cyan-950 via-slate-950 to-slate-900 border-t-4 border-cyan-500 flex items-center justify-around px-4 pt-1">
                <div className="w-16 h-8 bg-cyan-900/40 border-2 border-cyan-500 rounded-b flex items-center justify-center text-[9px] text-cyan-300 font-bold">
                  Pile Cap 1
                </div>
                <div className="w-16 h-8 bg-cyan-900/40 border-2 border-cyan-500 rounded-b flex items-center justify-center text-[9px] text-cyan-300 font-bold">
                  Pile Cap 2
                </div>
                <div className="w-16 h-8 bg-cyan-900/40 border-2 border-cyan-500 rounded-b flex items-center justify-center text-[9px] text-cyan-300 font-bold">
                  Pile Cap 3
                </div>
              </div>

            </div>

            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span> 32mm Heavy Main Rebar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping"></span> GI Corrosion Binding Wire (20 SWG)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span> Railway Steel Track Rails
              </span>
            </div>
          </div>
        )}

        {/* ----------------- STANDARD BUILDING ELEVATION MODE ----------------- */}
        {!isInfra && viewMode === 'elevation' && (
          <div className="w-full h-full flex flex-col justify-end items-center relative py-2">
            <div className="absolute top-3 left-4 text-xs font-mono text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{numFloors} Floor Elevation Structure</span>
            </div>

            <div className="w-full max-w-lg h-[290px] flex flex-col justify-end relative">
              {Array.from({ length: numFloors }).map((_, index) => {
                const floorLevel = numFloors - index;
                return (
                  <div
                    key={floorLevel}
                    className="w-full flex-1 border-t-4 border-amber-500/80 relative flex items-center justify-between px-6 bg-slate-900/40 my-1 rounded-sm"
                  >
                    <div className="absolute left-2 text-[10px] font-bold text-amber-400/90 bg-slate-950/80 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {floorLevel === 1 ? 'Ground Floor (G)' : `Floor ${floorLevel - 1}`}
                    </div>

                    <div className="w-4 h-full bg-slate-800/80 border-x-2 border-orange-500 flex flex-col justify-between py-1 relative">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-1 top-1/4 shadow-sm shadow-cyan-400 animate-pulse"></div>
                    </div>

                    <div className="w-4 h-full bg-slate-800/80 border-x-2 border-orange-500 flex flex-col justify-between py-1 relative">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-1 top-1/2 shadow-sm shadow-cyan-400 animate-pulse"></div>
                    </div>

                    <div className="w-4 h-full bg-slate-800/80 border-x-2 border-orange-500 flex flex-col justify-between py-1 relative">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -right-1 top-1/3 shadow-sm shadow-cyan-400 animate-pulse"></div>
                    </div>
                  </div>
                );
              })}

              <div className="w-full h-12 bg-gradient-to-t from-slate-950 to-slate-900 border-t-4 border-amber-600 flex items-center justify-between px-4 pt-1">
                <div className="w-12 h-8 bg-amber-900/40 border-2 border-amber-600 rounded-b flex items-center justify-center text-[9px] text-amber-300 font-bold">
                  Footing 1
                </div>
                <div className="w-12 h-8 bg-amber-900/40 border-2 border-amber-600 rounded-b flex items-center justify-center text-[9px] text-amber-300 font-bold">
                  Footing 2
                </div>
                <div className="w-12 h-8 bg-amber-900/40 border-2 border-amber-600 rounded-b flex items-center justify-center text-[9px] text-amber-300 font-bold">
                  Footing 3
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- VIEW 2: GRID / FLOORPLAN MODE ----------------- */}
        {viewMode === 'floorplan' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative p-2">
            <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              {isInfra ? 'Pier Cap & Girder Tying Grid' : `Floor Plan Beam & Column Grid (${numRooms} Rooms)`}
            </div>

            <div className="w-full max-w-md h-[240px] border-2 border-dashed border-cyan-500/50 rounded-xl p-3 grid grid-cols-3 gap-2 bg-slate-900/60 relative">
              {Array.from({ length: Math.min(6, numRooms) }).map((_, i) => (
                <div key={i} className="border border-slate-700/80 bg-slate-950/80 rounded-lg p-2 flex flex-col justify-between relative">
                  <div className="text-[10px] font-bold text-cyan-400">{isInfra ? `Girder Bay ${i + 1}` : `Room ${i + 1}`}</div>
                  <div className="w-3 h-3 bg-orange-500 rounded-sm absolute -top-1.5 -left-1.5 shadow-sm shadow-orange-500"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-sm absolute -top-1.5 -right-1.5 shadow-sm shadow-orange-500"></div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    {isInfra ? '32mm Main + 20 SWG GI' : '8mm @ 150mm c/c'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- VIEW 3: BINDING WIRE KNOT ZOOM ----------------- */}
        {viewMode === 'wirejoint' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative p-4">
            <div className="absolute top-3 left-4 text-xs font-mono text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              {isInfra ? 'Railway Pier 32mm Bar & GI Wire Tying Knot' : 'IS 2502 Binding Wire Knot Detail (18 SWG)'}
            </div>

            <div className="relative w-64 h-52 bg-slate-900/90 rounded-2xl border border-slate-700 flex items-center justify-center">
              {/* Vertical 32mm Main Rebar */}
              <div className="w-10 h-48 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 rounded-md border border-amber-300/40 shadow-lg shadow-orange-500/20 flex flex-col justify-around items-center">
                <div className="w-full h-1.5 bg-slate-950/40"></div>
                <div className="w-full h-1.5 bg-slate-950/40"></div>
                <div className="w-full h-1.5 bg-slate-950/40"></div>
              </div>

              {/* Horizontal 12mm Stirrup */}
              <div className="w-48 h-7 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 absolute rounded-md border border-amber-200/50 shadow-lg shadow-amber-500/20"></div>

              {/* Wire wrap */}
              <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-dashed animate-spin absolute shadow-lg shadow-cyan-400/50 flex items-center justify-center bg-cyan-400/20">
                <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
              </div>
            </div>

            <div className="text-xs text-cyan-300 mt-3 font-semibold text-center">
              {isInfra ? '20 SWG Galvanized Iron (GI) Rust Proof Wire double tied' : '18 SWG Annealed Steel Wire double loop tie'}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
