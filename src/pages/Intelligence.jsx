import { PORTFOLIO, MACRO_METRICS, FUND_METRICS } from '../data/portfolioData';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
const pct = (n) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;

function AgentBadge({ agent }) {
  const styles = {
    Buffett: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    Simons: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Both: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    Risk: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${styles[agent] || styles.Risk}`}>{agent}</span>
  );
}

function ConvictionBar({ value }) {
  const color = value >= 88 ? 'bg-emerald-500' : value >= 78 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-700 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-300 w-6 text-right">{value}</span>
    </div>
  );
}

function MacroCard({ label, value, unit, sub }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white text-xl font-bold">{value}<span className="text-slate-400 text-sm ml-1">{unit}</span></p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function Intelligence() {
  const equityWeight = (100 - MACRO_METRICS.cashLevel).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Intelligence Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Strategist Thesis: <span className="text-amber-400 font-medium">"AI & Energy Supercycle"</span> — 15-stock high-conviction portfolio
          </p>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 text-2xl font-bold">+{FUND_METRICS.cagr}% CAGR</p>
          <p className="text-slate-400 text-xs">20-yr backtest • net of {FUND_METRICS.frictionCost}% friction</p>
        </div>
      </div>

      {/* Agent Architecture Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Buffett Agent', role: 'Value', desc: 'Moats, FCF, intrinsic value', weight: 'SPY 70%', color: 'amber' },
          { name: 'Simons Agent', role: 'Quant', desc: 'Momentum, stat arb, patterns', weight: 'QQQ 70%', color: 'blue' },
          { name: 'Strategist', role: 'Arbiter', desc: 'Macro synthesis → 15-stock list', weight: 'Final Arbiter', color: 'emerald' },
          { name: 'Risk Agent', role: 'Risk', desc: 'Beta, correlation, diversification', weight: 'r > 0.85 alert', color: 'red' },
        ].map(a => (
          <div key={a.name} className={`bg-slate-800/60 border border-${a.color}-500/20 rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full bg-${a.color}-500`} />
              <p className="text-white text-sm font-semibold">{a.name}</p>
            </div>
            <p className={`text-${a.color}-400 text-xs font-medium mb-1`}>{a.role}</p>
            <p className="text-slate-400 text-xs">{a.desc}</p>
            <p className={`text-${a.color}-300 text-xs font-mono mt-2`}>{a.weight}</p>
          </div>
        ))}
      </div>

      {/* Macro Pulse */}
      <div>
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
          Macro Pulse
          <span className="text-xs font-normal text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">{MACRO_METRICS.regime}</span>
        </h2>
        <div className="grid grid-cols-6 gap-3">
          <MacroCard label="CPI" value={MACRO_METRICS.cpi} unit="%" sub="YoY inflation" />
          <MacroCard label="Fed Funds" value={MACRO_METRICS.fedFunds} unit="%" sub="Current rate" />
          <MacroCard label="ISM Mfg" value={MACRO_METRICS.ism} unit="" sub={MACRO_METRICS.ism < 50 ? '< 50 = Contraction' : '> 50 = Expansion'} />
          <MacroCard label="10yr Breakeven" value={MACRO_METRICS.inflation10yr} unit="%" sub="Inflation expectation" />
          <MacroCard label="Equity Weight" value={equityWeight} unit="%" sub="Deployed capital" />
          <MacroCard label="Cash Reserve" value={MACRO_METRICS.cashLevel} unit="%" sub={`Target: ${MACRO_METRICS.cashTarget}`} />
        </div>
      </div>

      {/* 15-Stock Portfolio Table */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-white font-semibold">High-Conviction Portfolio — {PORTFOLIO.length} Positions</h2>
          <span className="text-xs text-slate-400">Last rebalance: {MACRO_METRICS.lastRebalance}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {['Symbol', 'Name', 'Sector', 'Price', 'Weight', 'Conviction', 'Buffett', 'Simons', 'Beta', 'Lead Agent', 'Thesis'].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-slate-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {PORTFOLIO.map(s => (
                <tr key={s.id} className={`hover:bg-slate-700/20 transition-colors ${s.symbol === 'SGOV' ? 'bg-slate-900/40' : ''}`}>
                  <td className="px-3 py-3 font-bold text-white font-mono">{s.symbol}</td>
                  <td className="px-3 py-3 text-slate-300 whitespace-nowrap">{s.name}</td>
                  <td className="px-3 py-3">
                    <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">{s.sector}</span>
                  </td>
                  <td className="px-3 py-3 text-white font-mono">{fmt(s.price)}</td>
                  <td className="px-3 py-3 text-slate-300 font-mono">{s.weight.toFixed(1)}%</td>
                  <td className="px-3 py-3 w-32"><ConvictionBar value={s.conviction} /></td>
                  <td className="px-3 py-3">
                    <span className={`text-xs font-mono ${s.buffett >= 88 ? 'text-amber-400' : s.buffett >= 75 ? 'text-amber-300' : 'text-slate-400'}`}>{s.buffett}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-xs font-mono ${s.simons >= 88 ? 'text-blue-400' : s.simons >= 75 ? 'text-blue-300' : 'text-slate-400'}`}>{s.simons}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-slate-300">{s.beta.toFixed(2)}</td>
                  <td className="px-3 py-3"><AgentBadge agent={s.agent} /></td>
                  <td className="px-3 py-3 text-slate-400 text-xs max-w-xs">{s.thesis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
