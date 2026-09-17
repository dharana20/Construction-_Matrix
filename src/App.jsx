import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { calculateSteelRequirements, STEEL_BRANDS, CALCULATION_PRESETS } from './utils/calculator';
import { generatePDFReport } from './utils/pdfGenerator';

import Header from './components/Header';
import PresetBar from './components/PresetBar';
import InputPanel from './components/InputPanel';
import SummaryCards from './components/SummaryCards';
import StructuralVisualizer from './components/StructuralVisualizer';
import SteelWireBreakdown from './components/SteelWireBreakdown';
import ChartsPanel from './components/ChartsPanel';
import BrandComparison from './components/BrandComparison';
import EngineeringGuideModal from './components/EngineeringGuideModal';
import PDFReportTemplate from './components/PDFReportTemplate';

export default function App() {
  // Main Inputs State
  const [inputs, setInputs] = useState({
    plotArea: 1200,
    unit: 'sqft',
    builtupCoverage: 75,
    floors: 2, // G+1
    rooms: 6,
    structureType: 'standard',
    soilCondition: 'normal',
    steelGrade: 'fe550d',
    steelRate: 68,
    bindingWireRate: 85,
    laborRate: 8,
    bindingWireKgPerTon: 11,
    wastagePercent: 4,
    wireGauge: '18',
    wireType: 'annealed_black'
  });

  const [activePresetId, setActivePresetId] = useState('3bhk_duplex');
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown', 'visualizer', 'charts', 'brands'

  // Live calculated results
  const results = useMemo(() => {
    return calculateSteelRequirements(inputs);
  }, [inputs]);

  // Handlers
  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setActivePresetId('custom');
  };

  const handleSelectBrand = (brand) => {
    setInputs(prev => ({ ...prev, steelRate: brand.ratePerKg }));
  };

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setInputs(prev => ({
      ...prev,
      plotArea: preset.plotArea,
      unit: preset.unit,
      floors: preset.floors,
      rooms: preset.rooms,
      builtupCoverage: preset.coverage,
      structureType: preset.structureType,
      soilCondition: preset.soilCondition || 'normal',
      steelGrade: preset.steelGrade || 'fe550d'
    }));
  };

  const handleReset = () => {
    handleSelectPreset(CALCULATION_PRESETS[2]); // reset to 3 BHK duplex
  };

  const handleExportPDF = async () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
    await generatePDFReport('pdf-report-container', `Construction_Matrix_Report_${inputs.plotArea}sqft.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0b132b] text-slate-100 p-3 sm:p-6 lg:p-8 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header */}
      <Header
        onExportPDF={handleExportPDF}
        onOpenGuide={() => setShowGuide(true)}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Quick Presets */}
        <PresetBar
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />

        {/* Input Panel */}
        <InputPanel
          inputs={inputs}
          onChangeInput={handleInputChange}
          onSelectBrand={handleSelectBrand}
        />

        {/* Hero Summary Metric Cards */}
        <SummaryCards results={results} />

        {/* Neat & Clean Space Between Navigation Tabs */}
        <div className="glass-panel p-2 sm:p-3 border-amber-500/20">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-1 px-1">
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'breakdown'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800'
              }`}
            >
              <span>📋</span>
              <span>Steel & Wire Breakdown</span>
            </button>

            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'visualizer'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800'
              }`}
            >
              <span>🏢</span>
              <span>3D/2D Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('charts')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'charts'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800'
              }`}
            >
              <span>📊</span>
              <span>Cost Analytics Charts</span>
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'brands'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800'
              }`}
            >
              <span>🏆</span>
              <span>TMT Brand Matrix</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Views */}
        <div className="transition-all duration-300">
          {activeTab === 'breakdown' && (
            <SteelWireBreakdown results={results} />
          )}

          {activeTab === 'visualizer' && (
            <StructuralVisualizer results={results} />
          )}

          {activeTab === 'charts' && (
            <ChartsPanel results={results} />
          )}

          {activeTab === 'brands' && (
            <BrandComparison
              currentRate={inputs.steelRate}
              onSelectBrand={handleSelectBrand}
              totalSteelKg={results.steelSummary.totalSteelKgWithWastage}
            />
          )}

          {/* Complementary preview simulator under breakdown tab */}
          {activeTab === 'breakdown' && (
            <div className="mt-8">
              <StructuralVisualizer results={results} />
            </div>
          )}
        </div>

        {/* Hidden Printable PDF Template Container */}
        <div className="overflow-hidden h-0 opacity-0 pointer-events-none">
          <PDFReportTemplate results={results} />
        </div>

      </main>

      {/* Engineering Guide Modal */}
      <EngineeringGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-14 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          Construction Matrix &copy; {new Date().getFullYear()} — Engineering Estimation Engine
        </p>
        <p className="mt-1.5 text-[11px] text-slate-500 max-w-2xl mx-auto">
          Calculations based on IS 456:2000, IS 1786, IS 2502, IRC 112, and IRS Concrete Bridge Code. Accessible across Mobile, Tablet, & Desktop displays.
        </p>
      </footer>

    </div>
  );
}
