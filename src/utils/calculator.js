/**
 * Steel & Binding Wire Calculation Engine for Indian Civil & Heavy Infrastructure Construction
 * Standards based on IS 456:2000, IS 2502, IRC 112 (Bridge Code), and IRS Concrete Bridge Code.
 */

// Unit conversion factors to Square Feet
export const AREA_UNITS = {
  sqft: { label: 'Sq. Ft (Square Feet)', factor: 1, symbol: 'sq ft' },
  sqyard: { label: 'Sq. Yards (Gaj)', factor: 9, symbol: 'sq yd' },
  sqmeter: { label: 'Sq. Meters (m²)', factor: 10.7639, symbol: 'm²' },
  cent: { label: 'Cents (South India)', factor: 435.6, symbol: 'cents' },
  ankanam: { label: 'Ankanam (AP/TS)', factor: 72, symbol: 'ankanam font-semibold' }
};

// Construction Category
export const PROJECT_CATEGORIES = {
  residential: { label: '🏡 Residential Buildings', description: 'Houses, Duplex, Villas, Apartments' },
  commercial: { label: '🏢 Commercial & Industrial', description: 'Shopping Malls, Towers, Warehouses' },
  infrastructure: { label: '🚂 Railway & Heavy Infrastructure', description: 'Railway Bridges, Flyovers, Culverts, Viaducts' }
};

// Structure Quality & Density Standards (kg per sq ft of deck / slab built-up area)
export const STRUCTURE_TYPES = {
  light: {
    category: 'residential',
    label: 'Light Residential (1-2 Floors)',
    baseFactorKgPerSqFt: 3.5,
    description: 'Independent house, standard RCC spans'
  },
  standard: {
    category: 'residential',
    label: 'Standard Residential (G+1 to G+3)',
    baseFactorKgPerSqFt: 4.0,
    description: 'Duplex, multi-family home with standard beam column design'
  },
  heavy: {
    category: 'commercial',
    label: 'Heavy Structural / Commercial Building',
    baseFactorKgPerSqFt: 4.8,
    description: 'Commercial towers, shopping malls, high floor loads'
  },
  industrial_warehouse: {
    category: 'commercial',
    label: 'Industrial Warehouse / Factory Shed',
    baseFactorKgPerSqFt: 5.5,
    description: 'RCC pedestals, heavy machinery footings & slab'
  },
  railway_bridge: {
    category: 'infrastructure',
    label: '🚂 Railway Bridge / Track Viaduct',
    baseFactorKgPerSqFt: 11.5, // ~125 kg/m² for heavy dynamic train axle loads (IRS Code)
    description: 'Bridge Piers, Pier Caps, Deck Girders, Abutments under dynamic ballast axle loads'
  },
  highway_flyover: {
    category: 'infrastructure',
    label: '🌉 Highway Flyover / Road Overbridge',
    baseFactorKgPerSqFt: 9.5, // ~100 kg/m² IRC load standards
    description: 'Prestressed Girders, Pier Columns, Deck Slabs'
  },
  retaining_culvert: {
    category: 'infrastructure',
    label: '🧱 Box Culvert / Heavy Retaining Wall',
    baseFactorKgPerSqFt: 7.2,
    description: 'Earth pressure load bearing shear reinforcement walls'
  }
};

// Soil & Foundation Conditions
export const SOIL_CONDITIONS = {
  normal: { label: 'Normal Soil (Isolated Footings)', multiplier: 1.0 },
  soft: { label: 'Soft / Clayey Soil (Raft / Mat Footing)', multiplier: 1.12 },
  heavy: { label: 'Hard Rock / High Seismic Zone', multiplier: 1.22 },
  deep_pile: { label: 'Deep Water / Railway Deep Pile Foundation', multiplier: 1.35 }
};

// Steel Grade Yield Efficiency Factor
export const STEEL_GRADES = {
  fe500: { label: 'Fe 500 (Standard TMT)', factor: 1.0, description: 'Standard yield strength 500 N/mm²' },
  fe550d: { label: 'Fe 550D (Ductile High Strength)', factor: 0.95, description: 'Saves ~5% weight due to superior tensile strength' },
  fe600: { label: 'Fe 600 (Ultra High Strength)', factor: 0.90, description: 'High rise & heavy infrastructure pier columns' },
  ht_strand: { label: 'HT Wire Tendons (Prestressed Railway Bridge)', factor: 0.85, description: 'High tensile strands for Railway Bridge Girders' }
};

// Binding Wire Types
export const BINDING_WIRE_TYPES = {
  annealed_black: { label: 'Annealed MS Black Wire (18/20 SWG)', rateMultiplier: 1.0, desc: 'Standard residential & commercial tying' },
  gi_wire: { label: 'Galvanized Iron (GI) Binding Wire', rateMultiplier: 1.15, desc: 'Rust-resistant for Railway Bridges & Coastal zones' },
  ss_wire: { label: 'Stainless Steel (SS 304) Tying Wire', rateMultiplier: 2.2, desc: 'Ultra heavy duty corrosion proof for marine bridges' }
};

// Popular Steel Brands in India & baseline prices
export const STEEL_BRANDS = [
  { id: 'tata', name: 'Tata Tiscon 550D', ratePerKg: 72, qualityTier: 'Primary / Premium', ductileScore: '98%' },
  { id: 'jsw', name: 'JSW Neosteel 550D', ratePerKg: 69, qualityTier: 'Primary / Premium', ductileScore: '96%' },
  { id: 'jindal', name: 'Jindal Panther', ratePerKg: 68, qualityTier: 'Primary / Premium', ductileScore: '95%' },
  { id: 'sail', name: 'SAIL TMT EQR (Railway Spec)', ratePerKg: 67, qualityTier: 'PSU / Infrastructure Approved', ductileScore: '96%' },
  { id: 'kamdhenu', name: 'Kamdhenu Nxt', ratePerKg: 63, qualityTier: 'Secondary TMT', ductileScore: '90%' },
  { id: 'local', name: 'Local Re-rolled TMT', ratePerKg: 58, qualityTier: 'Economy', ductileScore: '82%' }
];

// Presets for quick calculations (Including Railway Bridge & Infrastructure)
export const CALCULATION_PRESETS = [
  {
    id: 'railway_bridge_50m',
    title: '🚂 Railway Bridge (50m Span)',
    category: 'infrastructure',
    plotArea: 3500, // Deck area (50m span x 6.5m width = ~325 sq.m = 3500 sq.ft)
    unit: 'sqft',
    floors: 1, // 1 deck span
    rooms: 8, // 8 pier locations / girder bays
    coverage: 100,
    structureType: 'railway_bridge',
    soilCondition: 'deep_pile',
    steelGrade: 'fe550d'
  },
  {
    id: 'highway_flyover_100m',
    title: '🌉 Highway Flyover Section',
    category: 'infrastructure',
    plotArea: 7500,
    unit: 'sqft',
    floors: 1,
    rooms: 12, // 12 pier caps
    coverage: 100,
    structureType: 'highway_flyover',
    soilCondition: 'deep_pile',
    steelGrade: 'fe550d'
  },
  {
    id: '3bhk_duplex',
    title: '🏠 3 BHK Residential Duplex (G+1)',
    category: 'residential',
    plotArea: 1200,
    unit: 'sqft',
    floors: 2,
    rooms: 6,
    coverage: 80,
    structureType: 'standard',
    soilCondition: 'normal',
    steelGrade: 'fe550d'
  },
  {
    id: 'commercial_tower',
    title: '🏢 Commercial Complex (G+5)',
    category: 'commercial',
    plotArea: 4000,
    unit: 'sqft',
    floors: 6,
    rooms: 24,
    coverage: 85,
    structureType: 'heavy',
    soilCondition: 'heavy',
    steelGrade: 'fe600'
  }
];

/**
 * Format numbers into Indian Currency Format (Lakhs, Crores, Thousands)
 */
export function formatIndianRupees(amount) {
  if (isNaN(amount) || amount === null) return '₹ 0';
  
  const rounded = Math.round(amount);
  
  const x = rounded.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return `₹ ${formattedInt}`;
}

/**
 * Format short text for large numbers (e.g. ₹ 4.25 Lakhs / ₹ 2.8 Cr)
 */
export function formatShortRupees(amount) {
  if (!amount) return '₹ 0';
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} Lakhs`;
  }
  if (amount >= 1000) {
    return `₹ ${(amount / 1000).toFixed(1)}k`;
  }
  return `₹ ${Math.round(amount)}`;
}

/**
 * Main Calculation Engine
 */
export function calculateSteelRequirements({
  plotArea = 1200,
  unit = 'sqft',
  builtupCoverage = 75,
  floors = 2,
  rooms = 6,
  structureType = 'standard',
  soilCondition = 'normal',
  steelGrade = 'fe550d',
  steelRate = 68,
  bindingWireRate = 85,
  laborRate = 8,
  bindingWireKgPerTon = 11,
  wastagePercent = 4,
  wireGauge = '18',
  wireType = 'annealed_black'
}) {
  // 1. Convert area to Sq. Ft
  const unitFactor = AREA_UNITS[unit]?.factor || 1;
  const plotAreaInSqFt = plotArea * unitFactor;
  
  // 2. Calculate Built-up area per floor/level and total across all levels/spans
  const builtUpPerFloor = plotAreaInSqFt * (builtupCoverage / 100);
  const totalBuiltUpArea = builtUpPerFloor * floors;

  // 3. Determine Base Steel Factor (kg per sq ft)
  const baseFactor = STRUCTURE_TYPES[structureType]?.baseFactorKgPerSqFt || 4.0;
  const isInfra = STRUCTURE_TYPES[structureType]?.category === 'infrastructure';

  // 4. Room / Pier Density Adjustment
  const expectedRooms = Math.max(2, (builtUpPerFloor / 350) * floors);
  const roomDiff = Math.max(0, rooms - expectedRooms);
  const roomMultiplier = 1 + (roomDiff * 0.025);

  // 5. Soil & Soil Foundation modifier
  const soilMultiplier = SOIL_CONDITIONS[soilCondition]?.multiplier || 1.0;

  // 6. Steel Grade Efficiency modifier
  const gradeMultiplier = STEEL_GRADES[steelGrade]?.factor || 1.0;

  // 7. Calculate Total Structural Steel Required (Rebar)
  const totalSteelKgRaw = totalBuiltUpArea * baseFactor * roomMultiplier * soilMultiplier * gradeMultiplier;
  const totalSteelKgWithWastage = totalSteelKgRaw * (1 + (wastagePercent / 100));
  const totalSteelTons = totalSteelKgWithWastage / 1000;

  // 8. Calculate Steel Binding Wires Required
  // Bridges & Railway structures use ~13-15 kg wire per ton due to heavy 25mm/32mm main bar cages
  const adjustedWireKgPerTon = isInfra ? Math.max(bindingWireKgPerTon, 13) : bindingWireKgPerTon;
  const totalBindingWireKg = totalSteelTons * adjustedWireKgPerTon;
  const bundleWeightKg = 25;
  const totalBindingWireRolls = Math.ceil(totalBindingWireKg / bundleWeightKg);
  
  // Meter length conversion for binding steel wires
  const metersPerKg = wireGauge === '20' ? 125 : 72;
  const totalBindingWireMeters = totalBindingWireKg * metersPerKg;
  const totalBindingWireFeet = totalBindingWireMeters * 3.28084;

  // Binding wire type multiplier (GI / SS Wire)
  const wireTypeMult = BINDING_WIRE_TYPES[wireType]?.rateMultiplier || 1.0;
  const effectiveBindingWireRate = bindingWireRate * wireTypeMult;

  // 9. Steel Bar Breakdown by Diameters (Including 25mm & 32mm for Railway Bridges!)
  let diameterConfig = [];
  if (isInfra) {
    // Railway & Highway Bridges heavy bar distribution
    diameterConfig = [
      { dia: 8, ratio: 0.10, useCase: 'Deck Slab Mesh Tying', bundleSize: 10 },
      { dia: 12, ratio: 0.15, useCase: 'Heavy Pier Cap Stirrups & Shear Links', bundleSize: 5 },
      { dia: 16, ratio: 0.20, useCase: 'Deck Beam Secondary Bars', bundleSize: 3 },
      { dia: 25, ratio: 0.30, useCase: 'Bridge Pier Column Main Cage Bars', bundleSize: 2 },
      { dia: 32, ratio: 0.25, useCase: 'Railway Deck Girders & Deep Pile Cage', bundleSize: 1 }
    ];
  } else {
    // Residential & Commercial standard distribution
    diameterConfig = [
      { dia: 8, ratio: 0.25, useCase: 'Column Stirrups, Slab Rings & Mesh', bundleSize: 10 },
      { dia: 10, ratio: 0.20, useCase: 'Slab Main Reinforcement, Lintels', bundleSize: 7 },
      { dia: 12, ratio: 0.25, useCase: 'Beam Secondary Bars, Chajja', bundleSize: 5 },
      { dia: 16, ratio: 0.20, useCase: 'Column Main Bars, Heavy Beams', bundleSize: 3 },
      { dia: 20, ratio: 0.10, useCase: 'Footing Reinforcement, Base Columns', bundleSize: 2 }
    ];
  }

  const rodBreakdown = diameterConfig.map(item => {
    const kgPerMeter = (item.dia * item.dia) / 162;
    const kgPer12mRod = kgPerMeter * 12;
    const weightForDiaKg = totalSteelKgWithWastage * item.ratio;
    const totalRods = Math.ceil(weightForDiaKg / kgPer12mRod);
    const totalBundles = Math.ceil(totalRods / item.bundleSize);
    const totalMeters = totalRods * 12;
    const totalFeet = totalMeters * 3.28084;

    return {
      dia: item.dia,
      ratioPercent: item.ratio * 100,
      weightKg: Math.round(weightForDiaKg),
      weightTons: (weightForDiaKg / 1000).toFixed(3),
      kgPerMeter: kgPerMeter.toFixed(3),
      kgPer12mRod: kgPer12mRod.toFixed(2),
      totalRods,
      totalBundles,
      bundleSize: item.bundleSize,
      totalMeters: Math.round(totalMeters),
      totalFeet: Math.round(totalFeet),
      useCase: item.useCase
    };
  });

  // 10. Structural Component Distribution
  let componentBreakdown = [];
  if (isInfra) {
    componentBreakdown = [
      { component: 'Deep Piles & Abutment Footings', percentage: 30, weightKg: Math.round(totalSteelKgWithWastage * 0.30) },
      { component: 'Bridge Pier Columns & Pier Caps', percentage: 35, weightKg: Math.round(totalSteelKgWithWastage * 0.35) },
      { component: 'Prestressed Deck Girders', percentage: 25, weightKg: Math.round(totalSteelKgWithWastage * 0.25) },
      { component: 'Track Slab & Parapet Walls', percentage: 10, weightKg: Math.round(totalSteelKgWithWastage * 0.10) }
    ];
  } else {
    componentBreakdown = [
      { component: 'Foundation Footings', percentage: 22, weightKg: Math.round(totalSteelKgWithWastage * 0.22) },
      { component: 'Columns (Pillars)', percentage: 28, weightKg: Math.round(totalSteelKgWithWastage * 0.28) },
      { component: 'Beams & Lintels', percentage: 28, weightKg: Math.round(totalSteelKgWithWastage * 0.28) },
      { component: 'Roof Slabs & Staircase', percentage: 22, weightKg: Math.round(totalSteelKgWithWastage * 0.22) }
    ];
  }

  // 11. Cost Calculations (in INR ₹)
  const baseSteelCost = totalSteelKgRaw * steelRate;
  const wastageCost = (totalSteelKgWithWastage - totalSteelKgRaw) * steelRate;
  const totalRebarSteelCost = totalSteelKgWithWastage * steelRate;
  
  const totalBindingWireCost = totalBindingWireKg * effectiveBindingWireRate;
  const totalLaborCost = totalSteelKgWithWastage * laborRate;
  
  const grandTotalCost = totalRebarSteelCost + totalBindingWireCost + totalLaborCost;
  const costPerSqFt = grandTotalCost / totalBuiltUpArea;

  return {
    inputs: {
      plotArea,
      unit,
      unitSymbol: AREA_UNITS[unit]?.symbol || 'sq ft',
      plotAreaInSqFt: Math.round(plotAreaInSqFt),
      builtupCoverage,
      builtUpPerFloor: Math.round(builtUpPerFloor),
      totalBuiltUpArea: Math.round(totalBuiltUpArea),
      floors,
      rooms,
      structureType,
      soilCondition,
      steelGrade,
      steelRate,
      bindingWireRate,
      effectiveBindingWireRate: Math.round(effectiveBindingWireRate),
      laborRate,
      bindingWireKgPerTon: adjustedWireKgPerTon,
      wastagePercent,
      wireGauge,
      wireType,
      isInfra
    },
    steelSummary: {
      totalSteelKgRaw: Math.round(totalSteelKgRaw),
      totalSteelKgWithWastage: Math.round(totalSteelKgWithWastage),
      totalSteelTons: parseFloat(totalSteelTons.toFixed(2)),
      wastageKg: Math.round(totalSteelKgWithWastage - totalSteelKgRaw),
      totalRods12m: rodBreakdown.reduce((sum, r) => sum + r.totalRods, 0),
      totalRodsBundles: rodBreakdown.reduce((sum, r) => sum + r.totalBundles, 0)
    },
    bindingWireSummary: {
      totalBindingWireKg: parseFloat(totalBindingWireKg.toFixed(1)),
      totalBindingWireRolls,
      bundleWeightKg,
      wireGauge,
      wireType,
      metersPerKg,
      totalBindingWireMeters: Math.round(totalBindingWireMeters),
      totalBindingWireFeet: Math.round(totalBindingWireFeet)
    },
    rodBreakdown,
    componentBreakdown,
    costSummary: {
      baseSteelCost: Math.round(baseSteelCost),
      wastageCost: Math.round(wastageCost),
      totalRebarSteelCost: Math.round(totalRebarSteelCost),
      totalBindingWireCost: Math.round(totalBindingWireCost),
      totalLaborCost: Math.round(totalLaborCost),
      grandTotalCost: Math.round(grandTotalCost),
      costPerSqFt: Math.round(costPerSqFt),
      grandTotalInLakhs: (grandTotalCost / 100000).toFixed(2),
      grandTotalInCrores: (grandTotalCost / 10000000).toFixed(3)
    }
  };
}
