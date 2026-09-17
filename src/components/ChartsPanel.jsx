import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { PieChart, BarChart3, DollarSign } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function ChartsPanel({ results }) {
  const { costSummary, rodBreakdown, componentBreakdown } = results;

  // 1. Cost Distribution Doughnut
  const costData = {
    labels: ['TMT Rebar Steel', 'Steel Binding Wires', 'Bar Bending Labour', 'Cut Wastage Allowance'],
    datasets: [
      {
        data: [
          costSummary.baseSteelCost,
          costSummary.totalBindingWireCost,
          costSummary.totalLaborCost,
          costSummary.wastageCost
        ],
        backgroundColor: ['#f97316', '#06b6d4', '#10b981', '#eab308'],
        borderColor: ['#0b132b', '#0b132b', '#0b132b', '#0b132b'],
        borderWidth: 2
      }
    ]
  };

  // 2. Diameter-Wise Bar Chart
  const diameterData = {
    labels: rodBreakdown.map(r => `${r.dia}mm`),
    datasets: [
      {
        label: 'Steel Weight (Kg)',
        data: rodBreakdown.map(r => r.weightKg),
        backgroundColor: '#f59e0b',
        borderRadius: 8,
        hoverBackgroundColor: '#f97316'
      }
    ]
  };

  // 3. Component Breakdown Pie
  const componentData = {
    labels: componentBreakdown.map(c => c.component),
    datasets: [
      {
        data: componentBreakdown.map(c => c.weightKg),
        backgroundColor: ['#38bdf8', '#fb923c', '#a855f7', '#34d399'],
        borderColor: '#0b132b',
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { size: 11, family: 'Inter' }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Cost Pie Chart */}
      <div className="glass-panel p-5 border-emerald-500/20">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700/60">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Cost Distribution (₹)
          </h3>
        </div>
        <div className="h-[220px]">
          <Doughnut data={costData} options={chartOptions} />
        </div>
      </div>

      {/* Diameter Weight Bar Chart */}
      <div className="glass-panel p-5 border-amber-500/20">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700/60">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Diameter Weight Breakdown (Kg)
          </h3>
        </div>
        <div className="h-[220px]">
          <Bar data={diameterData} options={barOptions} />
        </div>
      </div>

      {/* Component Pie Chart */}
      <div className="glass-panel p-5 border-cyan-500/20">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700/60">
          <PieChart className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Structural Component Weight
          </h3>
        </div>
        <div className="h-[220px]">
          <Pie data={componentData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
}
