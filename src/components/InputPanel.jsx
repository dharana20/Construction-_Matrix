import React from 'react';
import { AREA_UNITS, STRUCTURE_TYPES, SOIL_CONDITIONS, STEEL_GRADES, STEEL_BRANDS, BINDING_WIRE_TYPES } from '../utils/calculator';
import { Sliders, Maximize2, Layers, Home, IndianRupee, ShieldCheck, Cable, Sprout, Train, Building2 } from 'lucide-react';

export default function InputPanel({ inputs, onChangeInput, onSelectBrand }) {

  const handleNumChange = (field, val) => {
    const num = parseFloat(val);
    onChangeInput(field, isNaN(num) ? 0 : num);
  };

  const isInfra = STRUCTURE_TYPES[inputs.structureType]?.category === 'infrastructure';

  return (
    <div className="glass-panel p-5 mb-6 border-slate-700/60 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-slate-700/60 gap-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
            Construction Project Details & Market Pricing
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isInfra && (
            <span className="badge-blue text-xs px-2.5 py-1 font-bold flex items-center gap-1">
              <Train className="w-3.5 h-3.5 text-cyan-400" /> IRS & IRC Bridge Specifications Active
            </span>
          )}
          <span className="text-xs text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
            Live Calculation
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Project Type & Structure Load Rating */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" /> Project Type & Load Standard
            </span>
          </label>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Structure Category</span>
              <select
                value={inputs.structureType}
                onChange={(e) => onChangeInput('structureType', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 text-xs font-bold rounded-lg px-2.5 py-2 focus:border-amber-500"
              >
                <optgroup label="🚂 Railway & Infrastructure">
                  <option value="railway_bridge">🚂 Railway Bridge / Track Viaduct (~11.5 kg/sq.ft)</option>
                  <option value="highway_flyover">🌉 Highway Flyover / Road Overbridge (~9.5 kg/sq.ft)</option>
                  <option value="retaining_culvert">🧱 Box Culvert / Retaining Wall (~7.2 kg/sq.ft)</option>
                </optgroup>
                <optgroup label="🏢 Commercial & Industrial">
                  <option value="heavy">🏢 Commercial Complex / High Rise (~4.8 kg/sq.ft)</option>
                  <option value="industrial_warehouse">🏭 Industrial Warehouse Shed (~5.5 kg/sq.ft)</option>
                </optgroup>
                <optgroup label="🏡 Residential Buildings">
                  <option value="standard">🏠 Standard Residential (G+1 to G+3) (~4.0 kg/sq.ft)</option>
                  <option value="light">🏡 Light Independent House (~3.5 kg/sq.ft)</option>
                </optgroup>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Soil / Foundation Type</span>
              <select
                value={inputs.soilCondition}
                onChange={(e) => onChangeInput('soilCondition', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium"
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

        {/* 2. Plot / Deck Area & Coverage */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-cyan-400" /> {isInfra ? 'Bridge Deck Span Area' : 'Plot & Builtup Area'}
            </span>
            <span className="text-cyan-400 font-extrabold text-sm">{inputs.plotArea} {inputs.unitSymbol}</span>
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              min="100"
              max="100000"
              step="100"
              value={inputs.plotArea}
              onChange={(e) => handleNumChange('plotArea', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-slate-100 font-bold text-base focus:outline-none"
            />
            <select
              value={inputs.unit}
              onChange={(e) => onChangeInput('unit', e.target.value)}
              className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold rounded-lg px-2 py-2"
            >
              {Object.entries(AREA_UNITS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
              <span>Coverage Ratio</span>
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

        {/* 3. Floors / Spans & Room / Girder Count */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" /> {isInfra ? 'Pier Spans & Girder Bays' : 'Floor Levels & Rooms'}
            </span>
            <span className="text-emerald-300 text-xs font-semibold">Total Area: {inputs.totalBuiltUpArea} sq ft</span>
          </label>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                {isInfra ? 'Pier / Deck Spans' : 'Floor Levels'}
              </span>
              <select
                value={inputs.floors}
                onChange={(e) => handleNumChange('floors', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-slate-100 font-bold text-sm rounded-lg px-3 py-2"
              >
                <option value={1}>{isInfra ? '1 Deck Span' : 'Ground Floor Only (G)'}</option>
                <option value={2}>{isInfra ? '2 Spans / Viaducts' : 'Ground + 1 Floor (G+1)'}</option>
                <option value={3}>{isInfra ? '3 Spans / Viaducts' : 'Ground + 2 Floors (G+2)'}</option>
                <option value={4}>{isInfra ? '4 Spans / Viaducts' : 'Ground + 3 Floors (G+3)'}</option>
                <option value={6}>{isInfra ? '6 Spans / Viaducts' : 'Ground + 5 Floors (G+5)'}</option>
                <option value={10}>{isInfra ? '10 Spans Major Bridge' : 'Ground + 9 Floors (G+9)'}</option>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                {isInfra ? 'Girder Bays / Piers' : 'Total Rooms'}
              </span>
              <input
                type="number"
                min="1"
                max="60"
                value={inputs.rooms}
                onChange={(e) => handleNumChange('rooms', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-slate-100 font-bold text-sm rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1 bg-slate-950/40 p-2 rounded border border-slate-800">
            <Home className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              {isInfra ? 'Railway IRS Code Heavy Reinforcement Specs' : `Avg ${Math.round(inputs.rooms / inputs.floors)} rooms per floor level`}
            </span>
          </div>
        </div>

        {/* 4. Brand & Steel Grade */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> TMT Brand & Grade
            </span>
          </label>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Steel Brand</span>
              <select
                onChange={(e) => {
                  const b = STEEL_BRANDS.find(x => x.id === e.target.value);
                  if (b) onSelectBrand(b);
                }}
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 text-xs font-bold rounded-lg px-2.5 py-2"
              >
                {STEEL_BRANDS.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name} — ₹{brand.ratePerKg}/kg ({brand.qualityTier})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Steel Grade (IS 1786)</span>
              <select
                value={inputs.steelGrade}
                onChange={(e) => onChangeInput('steelGrade', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2"
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

        {/* 5. Live Rates & Binding Wire Spec */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 md:col-span-2 lg:col-span-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-emerald-400" /> Indian Unit Rates (₹ / Kg) & Binding Wire Specs
            </span>
            <span className="text-xs text-slate-400">Customizable Market Rates</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Rebar Rate */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-slate-300">TMT Steel Rebar</span>
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
              <span className="text-[10px] text-slate-400 block mt-1">₹ {(inputs.steelRate * 1000).toLocaleString('en-IN')} per Ton</span>
            </div>

            {/* Binding Wire Rate & Type */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-slate-300">Binding Wire Rate</span>
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
              <div className="mt-1 space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Wire Material:</span>
                  <select
                    value={inputs.wireType}
                    onChange={(e) => onChangeInput('wireType', e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] font-bold rounded px-1 py-0.5"
                  >
                    {Object.entries(BINDING_WIRE_TYPES).map(([key, item]) => (
                      <option key={key} value={key}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Labor Rate */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-slate-300">Bar Bending Labor</span>
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
              <span className="text-[10px] text-slate-400 block mt-1">Cutting, cage assembly & tying labor</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
