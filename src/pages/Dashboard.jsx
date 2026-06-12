import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import SummaryCard from '../components/SummaryCard';
import usePortfolio from '../hooks/usePortfolio';
import { generatePortfolioHistory } from '../data/mockData';
import { useMemo } from 'react';

const historyData = generatePortfolioHistory();

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-emerald-400 font-bold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const { totalValue, totalGainLoss, totalGainLossPercent, holdings } = usePortfolio();

  const trend = totalGainLoss >= 0 ? 'positive' : 'negative';
  const sign = totalGainLoss >= 0 ? '+' : '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          title="Total Portfolio Value"
          value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="All holdings combined"
          trend="neutral"
        />
        <SummaryCard
          title="Total Gain / Loss"
          value={`${sign}$${Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={`${sign}${totalGainLossPercent.toFixed(2)}% all time`}
          trend={trend}
        />
        <SummaryCard
          title="Holdings"
          value={holdings.length}
          subtitle="Active positions"
          trend="neutral"
        />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Portfolio Value — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
