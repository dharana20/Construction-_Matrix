import React from 'react';
import { AREA_UNITS, STRUCTURE_TYPES, SOIL_CONDITIONS, STEEL_GRADES, STEEL_BRANDS } from '../utils/calculator';
import { Sliders, Maximize2, Layers, Home, IndianRupee, ShieldCheck, Train, Building2 } from 'lucide-react';

export default function InputPanel({ inputs, onChangeInput, onSelectBrand }) {

  const handleNumChange = (field, val) => {
    const num = parseFloat(val);
    onChangeInput(field, isNaN(num) ? 0 : num);
  };

  const isInfra = STRUCTURE_TYPES[inputs.structureType]?.category === 'infrastructure';

  return (
    <div className="glass-panel p-6 sm:p-8 mb-10 sm:mb-12 border-slate-700/60 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-700/60 gap-3">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-100 uppercase tracking-wide">
            Construction Project Details & Market Pricing
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          {isInfra && (
            <span className="badge-blue text-xs px-3 py-1 font-bold flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5 text-cyan-400" /> IRS & IRC Bridge Specifications Active
            </span>
          )}
          <span className="text-xs text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">
            Live Calculations
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 sm:gap-7">

        {/* 1. Project Type & Structure Load Rating */}
        <div className="bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-between shadow-md">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" /> Project Type & Load Standard
              </span>
            </label>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">Structure Category</span>
                <select
                  value={inputs.structureType}
                  onChange={(e) => onChangeInput('structureType', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-amber-300 text-xs font-bold rounded-xl px-3.5 py-3 focus:border-amber-500 shadow-inner"
                >
                  <optgroup label="🚂 Railway & Infrastructure">
                    <option value="railway_bridge">🚂 Railway Bridge / Viaduct (~11.5 kg/sq.ft)</option>
                    <option value="highway_flyover">🌉 Highway Flyover / Road Overbridge (~9.5 kg/sq.ft)</option>
                    <option value="retaining_culvert">🧱 Box Culvert / Retaining Wall (~7.2 kg/sq.ft)</option>
                  </optgroup>
                  <optgroup label="🏢 Commercial & Industrial">
                    <option value="heavy">🏢 Commercial Complex / Tower (~4.8 kg/sq.ft)</option>
                    <option value="industrial_warehouse">🏭 Industrial Warehouse Shed (~5.5 kg/sq.ft)</option>
                  </optgroup>
                  <optgroup label="🏡 Residential Buildings">
                    <option value="standard">🏠 Standard Residential (G+1 to G+3) (~4.0 kg/sq.ft)</option>
                    <option value="light">🏡 Light Independent House (~3.5 kg/sq.ft)</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">Soil / Foundation Type</span>
                <select
                  value={inputs.soilCondition}
                  onChange={(e) => onChangeInput('soilCondition', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-3 font-medium shadow-inner"
                >
                  {Object.entries(SOIL_CONDITIONS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Plot / Deck Area & Coverage */}
        <div className="bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-between shadow-md">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-cyan-400" /> {isInfra ? 'Bridge Deck Span Area' : 'Plot & Builtup Area'}
              </span>
              <span className="text-cyan-400 font-extrabold text-sm">{inputs.plotArea} {inputs.unitSymbol}</span>
            </label>
            
            <div className="flex gap-2.5 mb-4">
              <input
                type="number"
                min="100"
                max="100000"
                step="100"
                value={inputs.plotArea}
                onChange={(e) => handleNumChange('plotArea', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 font-extrabold text-base focus:outline-none shadow-inner"
              />
              <select
                value={inputs.unit}
                onChange={(e) => onChangeInput('unit', e.target.value)}
                className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl px-3 py-3"
              >
                {Object.entries(AREA_UNITS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Slab Builtup Coverage</span>
                <span className="text-cyan-300 font-bold">{inputs.builtupCoverage}% ({inputs.builtUpPerFloor} sq ft/span)</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={inputs.builtupCoverage}
                onChange={(e) => handleNumChange('builtupCoverage', e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Floors / Spans & Room / Girder Count */}
        <div className="bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-between shadow-md">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" /> {isInfra ? 'Pier Spans & Girder Bays' : 'Floor Levels & Rooms'}
              </span>
              <span className="text-emerald-300 text-xs font-semibold">{inputs.totalBuiltUpArea} sq ft</span>
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">
                  {isInfra ? 'Pier / Deck Spans' : 'Floor Levels'}
                </span>
                <select
                  value={inputs.floors}
                  onChange={(e) => handleNumChange('floors', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-slate-100 font-bold text-sm rounded-xl px-3.5 py-3 shadow-inner"
                >
                  <option value={1}>{isInfra ? '1 Deck Span' : 'Ground Floor (G)'}</option>
                  <option value={2}>{isInfra ? '2 Spans / Viaducts' : 'Ground + 1 (G+1)'}</option>
                  <option value={3}>{isInfra ? '3 Spans / Viaducts' : 'Ground + 2 (G+2)'}</option>
                  <option value={4}>{isInfra ? '4 Spans / Viaducts' : 'Ground + 3 (G+3)'}</option>
                  <option value={6}>{isInfra ? '6 Spans / Viaducts' : 'Ground + 5 (G+5)'}</option>
                  <option value={10}>{isInfra ? '10 Spans Major Bridge' : 'Ground + 9 (G+9)'}</option>
                </select>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">
                  {isInfra ? 'Girder Bays' : 'Total Rooms'}
                </span>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={inputs.rooms}
                  onChange={(e) => handleNumChange('rooms', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-slate-100 font-bold text-sm rounded-xl px-3.5 py-3 shadow-inner"
                />
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 font-medium">
              <Home className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {isInfra ? 'Railway IRS Code Heavy Reinforcement Specs' : `Avg ${Math.round(inputs.rooms / inputs.floors)} rooms per floor level`}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Brand & Steel Grade */}
        <div className="bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-between shadow-md">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> TMT Brand & Grade
              </span>
            </label>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">Steel Brand</span>
                <select
                  onChange={(e) => {
                    const b = STEEL_BRANDS.find(x => x.id === e.target.value);
                    if (b) onSelectBrand(b);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-amber-300 text-xs font-bold rounded-xl px-3.5 py-3 shadow-inner"
                >
                  {STEEL_BRANDS.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name} — ₹{brand.ratePerKg}/kg ({brand.qualityTier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1.5">Steel Grade (IS 1786)</span>
                <select
                  value={inputs.steelGrade}
                  onChange={(e) => onChangeInput('steelGrade', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-3 font-medium shadow-inner"
                >
                  {Object.entries(STEEL_GRADES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Live Unit Rates */}
        <div className="bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-between shadow-md 2xl:col-span-1 md:col-span-2">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-400" /> Market Unit Rates (₹/Kg)
              </span>
            </label>

            <div className="space-y-3.5">
              
              {/* Rebar Rate */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-300">TMT Steel</span>
                  <span className="text-amber-400 font-extrabold text-sm">₹ {inputs.steelRate} / kg</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="120"
                  step="1"
                  value={inputs.steelRate}
                  onChange={(e) => handleNumChange('steelRate', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Binding Wire Rate */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-300">Binding Wire</span>
                  <span className="text-cyan-400 font-extrabold text-sm">₹ {inputs.bindingWireRate} / kg</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="1"
                  value={inputs.bindingWireRate}
                  onChange={(e) => handleNumChange('bindingWireRate', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Labor Rate */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-300">Labor Rate</span>
                  <span className="text-emerald-400 font-extrabold text-sm">₹ {inputs.laborRate} / kg</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  step="0.5"
                  value={inputs.laborRate}
                  onChange={(e) => handleNumChange('laborRate', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
