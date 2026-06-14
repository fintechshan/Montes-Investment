import { PORTFOLIO, FUND_METRICS, MACRO_METRICS } from '../data/portfolioData';
import { TRADE_LOG, ANNUAL_RETURNS } from '../data/backtestData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

// Simulate 30-day market pulse
const MARKET_PULSE = [
  { symbol: 'NVDA', price: 131.38, change: 4.22, changePct: 3.32, signal: 'Strong Buy' },
  { symbol: 'MSFT', price: 415.20, change: -2.10, changePct: -0.50, signal: 'Hold' },
  { symbol: 'AAPL', price: 189.30, change: 1.45, changePct: 0.77, signal: 'Hold' },
  { symbol: 'META', price: 527.60, change: 8.90, changePct: 1.72, signal: 'Buy' },
  { symbol: 'GOOGL', price: 175.40, change: 3.10, changePct: 1.80, signal: 'Buy' },
  { symbol: 'TSM', price: 172.85, change: 5.60, changePct: 3.35, signal: 'Strong Buy' },
  { symbol: 'AMZN', price: 185.60, change: 1.25, changePct: 0.68, signal: 'Hold' },
  { symbol: 'LLY', price: 798.45, change: -12.40, changePct: -1.53, signal: 'Hold' },
  { symbol: 'CEG', price: 238.72, change: 9.85, changePct: 4.30, signal: 'Strong Buy' },
  { symbol: 'PLTR', price: 34.82, change: 1.22, changePct: 3.63, signal: 'Buy' },
  { symbol: 'JPM', price: 198.45, change: 3.20, changePct: 1.64, signal: 'Hold' },
  { symbol: 'XOM', price: 108.32, change: -0.85, changePct: -0.78, signal: 'Hold' },
  { symbol: 'BRK.B', price: 398.20, change: 2.10, changePct: 0.53, signal: 'Hold' },
  { symbol: 'NEE', price: 71.45, change: 0.92, changePct: 1.30, signal: 'Hold' },
  { symbol: 'SGOV', price: 100.41, change: 0.01, changePct: 0.01, signal: 'Hold' },
];

const SIGNAL_STYLE = {
  'Strong Buy': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  'Buy': 'bg-green-500/10 text-green-400 border border-green-500/20',
  'Hold': 'bg-slate-700 text-slate-400 border border-slate-600',
  'Sell': 'bg-red-500/10 text-red-400 border border-red-500/20',
};

const alphaData = ANNUAL_RETURNS.map(r => ({
  year: r.year,
  alpha: parseFloat((r.montes - r.spy).toFixed(1)),
}));

export default function Auditor() {
  const totalFriction = TRADE_LOG.length * FUND_METRICS.frictionCost;
  const strategyAligned = MARKET_PULSE.filter(s => s.signal === 'Strong Buy' || s.signal === 'Buy').length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Performance Auditor</h1>
          <p className="text-slate-400 text-sm mt-1">Independent daily auditor · Alpha tracking · 30-day market pulse · Strategy alignment</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Auditor Active</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Alpha Generated', value: `+${FUND_METRICS.alpha}%`, sub: 'vs S&P 500 annualized', color: 'text-emerald-400' },
          { label: '20-yr Total Return', value: `+${FUND_METRICS.totalReturn}%`, sub: '$100k → ~$2.14M', color: 'text-emerald-400' },
          { label: 'Sharpe Ratio', value: FUND_METRICS.sharpe, sub: 'Risk-adjusted return', color: 'text-amber-400' },
          { label: 'Friction Cost', value: `${totalFriction.toFixed(2)}%`, sub: `${TRADE_LOG.length} trades × 0.1%`, color: 'text-slate-300' },
          { label: 'Strategy Aligned', value: `${strategyAligned}/${PORTFOLIO.length}`, sub: 'Buy/Strong Buy signals', color: strategyAligned >= 10 ? 'text-emerald-400' : 'text-amber-400' },
        ].map(c => (
          <div key={c.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{c.label}</p>
            <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-slate-500 text-xs mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Alpha Chart */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Annual Alpha vs S&P 500 (Montes − SPY)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={alphaData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v) => [`${v >= 0 ? '+' : ''}${v}%`, 'Alpha']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
            <ReferenceLine y={0} stroke="#334155" />
            <Bar dataKey="alpha" radius={[2, 2, 0, 0]}>
              {alphaData.map(e => <Cell key={e.year} fill={e.alpha >= 0 ? '#10b981' : '#ef4444'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 30-Day Market Pulse */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">30-Day Market Pulse</h2>
            <span className="text-xs text-slate-400">Strategy Alignment Audit</span>
          </div>
          <div className="divide-y divide-slate-700/30 max-h-80 overflow-auto">
            {MARKET_PULSE.map(s => (
              <div key={s.symbol} className="flex items-center justify-between px-5 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-white font-mono font-bold text-sm w-12">{s.symbol}</span>
                  <span className="text-white font-mono text-sm">{fmt(s.price)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-sm ${s.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${SIGNAL_STYLE[s.signal]}`}>{s.signal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Log */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700">
            <h2 className="text-white font-semibold text-sm">Historical Trade Log — 0.1% Friction Applied</h2>
          </div>
          <div className="divide-y divide-slate-700/30 overflow-auto max-h-80">
            {TRADE_LOG.map((t, i) => (
              <div key={i} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${t.action === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{t.action}</span>
                    <span className="text-white font-mono font-bold">{t.symbol}</span>
                    <span className="text-slate-400 text-xs">{t.shares} shares @ {fmt(t.price)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs font-mono">−{t.friction}% friction</span>
                    <span className="text-slate-400 text-xs">{t.date}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs">{t.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
