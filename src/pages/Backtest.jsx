import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell, Legend } from 'recharts';
import { generateBacktestSeries, ANNUAL_RETURNS } from '../data/backtestData';
import { FUND_METRICS } from '../data/portfolioData';

const fmt$ = (n) => `$${(n / 1000).toFixed(0)}k`;
const fmtFull = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const GrowthTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs">
        <p className="text-slate-400 mb-2 font-semibold">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {fmtFull(p.value)}</p>
        ))}
        {payload[0]?.payload?.event && (
          <p className="text-yellow-400 mt-1">⚡ {payload[0].payload.event}</p>
        )}
      </div>
    );
  }
  return null;
};

const ReturnTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs">
        <p className="text-slate-400 mb-2">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value >= 0 ? '+' : ''}{p.value.toFixed(1)}%</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Backtest() {
  const growthData = useMemo(() => generateBacktestSeries(), []);
  const finalMontes = growthData[growthData.length - 1]?.montes ?? 0;
  const finalSpy = growthData[growthData.length - 1]?.spy ?? 0;
  const finalQqq = growthData[growthData.length - 1]?.qqq ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Backtest Engine</h1>
        <p className="text-slate-400 text-sm mt-1">20-year simulation (2006–2026) · Temporal Logic Gates · {FUND_METRICS.frictionCost}% friction per trade · No look-ahead bias</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Montes CAGR', value: `+${FUND_METRICS.cagr}%`, sub: '20-yr net of fees', color: 'text-emerald-400' },
          { label: 'vs S&P 500', value: `+${(FUND_METRICS.cagr - FUND_METRICS.benchmarkCAGR).toFixed(1)}%`, sub: `Benchmark: +${FUND_METRICS.benchmarkCAGR}%`, color: 'text-emerald-400' },
          { label: '$100k → Today', value: fmtFull(finalMontes), sub: `SPY: ${fmtFull(finalSpy)}`, color: 'text-emerald-400' },
          { label: 'Sharpe Ratio', value: FUND_METRICS.sharpe, sub: `Max DD: ${FUND_METRICS.maxDrawdown}%`, color: 'text-amber-400' },
        ].map(c => (
          <div key={c.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-slate-500 text-xs mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Growth Chart */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">$100,000 Portfolio Growth — 2006 to 2026</h2>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Montes (+{FUND_METRICS.cagr}%)</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-0.5 bg-blue-400 inline-block" /> QQQ (+{FUND_METRICS.nasdaqCAGR}%)</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-0.5 bg-slate-500 inline-block" /> SPY (+{FUND_METRICS.benchmarkCAGR}%)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData} margin={{ top: 5, right: 20, left: 15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={fmt$} />
            <Tooltip content={<GrowthTooltip />} />
            <ReferenceLine y={100000} stroke="#334155" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="montes" name="Montes" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="qqq" name="QQQ" stroke="#6366f1" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
            <Line type="monotone" dataKey="spy" name="SPY" stroke="#475569" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Annual Returns Bar Chart */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Annual Returns by Year</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={ANNUAL_RETURNS} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<ReturnTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            <ReferenceLine y={0} stroke="#334155" />
            <Bar dataKey="montes" name="Montes" radius={[2, 2, 0, 0]}>
              {ANNUAL_RETURNS.map(e => <Cell key={e.year} fill={e.montes >= 0 ? '#10b981' : '#ef4444'} />)}
            </Bar>
            <Bar dataKey="spy" name="SPY" fill="#47556960" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Methodology */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Backtest Methodology</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {[
            { title: 'Temporal Logic Gates', desc: 'AI restricted to data available only up to the year being simulated. Zero look-ahead bias.' },
            { title: '0.1% Friction Cost', desc: 'Every trade penalised 0.1% for slippage and transaction costs. CAGR is net-of-fees.' },
            { title: '15-Stock Limit', desc: 'Concentration constraint forces only high-conviction ideas. No dilution from mediocre picks.' },
          ].map(m => (
            <div key={m.title} className="bg-slate-900/60 rounded-lg p-4">
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-2">{m.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
