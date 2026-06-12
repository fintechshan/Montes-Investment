import { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import SummaryCard from '../components/SummaryCard';
import usePortfolio from '../hooks/usePortfolio';
import { generatePortfolioHistory } from '../data/mockData';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-green-400 font-bold">{fmt(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { totalValue, totalGainLoss, totalGainLossPercent, holdings } = usePortfolio();
  const history = useMemo(() => generatePortfolioHistory(), []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Portfolio overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Portfolio Value"
          value={fmt(totalValue)}
          subtitle="Current market value"
          trend="neutral"
        />
        <SummaryCard
          title="Total Gain / Loss"
          value={`${totalGainLoss >= 0 ? '+' : ''}${fmt(totalGainLoss)}`}
          subtitle={`${totalGainLossPercent >= 0 ? '+' : ''}${totalGainLossPercent.toFixed(2)}% all time`}
          trend={totalGainLoss >= 0 ? 'positive' : 'negative'}
        />
        <SummaryCard
          title="Holdings"
          value={holdings.length}
          subtitle="Active positions"
          trend="neutral"
        />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Portfolio Value — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              interval={4}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: '#22c55e', stroke: '#0f172a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
