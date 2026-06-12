import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { usePortfolio } from '../hooks/usePortfolio'
import { generateHistory } from '../data/mockMarkets'

function StatCard({ label, value, sub, positive }) {
  return (
    <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && (
        <p className={`text-sm mt-1 font-medium ${positive === undefined ? 'text-slate-400' : positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#111d35] border border-[#1a2744] rounded-lg px-3 py-2 text-sm">
        <p className="text-slate-400">{label}</p>
        <p className="text-emerald-400 font-semibold">{fmt(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { holdings, totalValue, totalGain, totalGainPct } = usePortfolio()

  const chartData = useMemo(() => generateHistory(totalValue), [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here's your portfolio overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Value" value={fmt(totalValue)} />
        <StatCard
          label="Total Gain / Loss"
          value={fmt(totalGain)}
          sub={`${totalGain >= 0 ? '+' : ''}${totalGainPct.toFixed(2)}% all time`}
          positive={totalGain >= 0}
        />
        <StatCard label="Holdings" value={holdings.length} sub="active positions" />
        <StatCard
          label="Best Performer"
          value={holdings.length ? holdings.reduce((a, b) => a.gainPct > b.gainPct ? a : b).symbol : '—'}
          sub={holdings.length ? `+${Math.max(...holdings.map(h => h.gainPct)).toFixed(2)}%` : ''}
          positive={true}
        />
      </div>

      {/* Chart */}
      <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Portfolio Value — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2744" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} interval={4} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top holdings table */}
      <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a2744]">
          <h2 className="text-white font-semibold">Top Holdings</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-[#1a2744]">
              <th className="text-left px-6 py-3">Symbol</th>
              <th className="text-right px-6 py-3">Shares</th>
              <th className="text-right px-6 py-3">Value</th>
              <th className="text-right px-6 py-3">Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {[...holdings].sort((a, b) => b.value - a.value).slice(0, 5).map(h => (
              <tr key={h.id} className="border-b border-[#1a2744]/50 hover:bg-[#111d35] transition-colors">
                <td className="px-6 py-4 font-semibold text-white">{h.symbol}</td>
                <td className="px-6 py-4 text-right text-slate-300">{h.shares}</td>
                <td className="px-6 py-4 text-right text-white">{fmt(h.value)}</td>
                <td className={`px-6 py-4 text-right font-medium ${h.gain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {h.gain >= 0 ? '+' : ''}{fmt(h.gain)} ({h.gainPct.toFixed(2)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
