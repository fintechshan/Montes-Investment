import { REBALANCE_LOG, FUND_METRICS } from '../data/portfolioData';

const VERSIONS = [
  { version: 'v2.2.0', label: 'Current', date: '2024-11-15', color: 'emerald', changes: ['Full-Stack Architecture (Express + Vite)', 'Independent Performance Auditor with daily live quotes', 'Automated Macro-Metrics (CPI, Fed Funds, ISM)', 'Strategy Alignment Audit vs macro regime'] },
  { version: 'v2.1.0', label: 'Prior', date: '2024-08-01', color: 'blue', changes: ['Live Data Syncing across all modules', 'Strategist Alignment with "AI & Energy Supercycle" thesis', 'Historical Rebalancing Log (20-year evolution)'] },
  { version: 'v2.0.0', label: '', date: '2024-03-01', color: 'slate', changes: ['Correlation Heatmap and Triple-Series Backtest', 'Institutional Consensus and Macro Pulse', 'Montes Equity Co-Pilot Rebrand'] },
  { version: 'v1.0.0', label: '', date: '2023-01-01', color: 'slate', changes: ['Basic Multi-Agent System (Buffett, Simons, Strategist)', 'Initial Alpha Prototype'] },
];

export default function About() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">About & Architecture</h1>
        <p className="text-slate-400 text-sm mt-1">The Montes Equity Co-Pilot Fund — Hierarchical Multi-Agent Investment System</p>
      </div>

      {/* Hero Stat Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '20-Year CAGR', value: `${FUND_METRICS.cagr}%`, sub: 'Net of 0.1% friction' },
          { label: 'Sharpe Ratio', value: FUND_METRICS.sharpe, sub: 'Risk-adjusted' },
          { label: 'Max Drawdown', value: `${FUND_METRICS.maxDrawdown}%`, sub: 'GFC 2008' },
          { label: 'Alpha vs S&P', value: `+${FUND_METRICS.alpha}%`, sub: 'Annualized' },
        ].map(c => (
          <div key={c.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 text-center">
            <p className="text-emerald-400 text-2xl font-bold">{c.value}</p>
            <p className="text-white text-sm font-medium mt-1">{c.label}</p>
            <p className="text-slate-500 text-xs">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Multi-Agent Architecture */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Multi-Agent Architecture</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The fund operates on a <span className="text-white">Hierarchical Multi-Agent System</span> that blends qualitative
          "wisdom" with quantitative "rigor" by simulating a high-end investment committee.
          Each agent specializes in a distinct analytical domain, and the Strategist acts as the final arbiter.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              name: 'Buffett Agent', role: 'Value Investor', color: 'amber',
              weight: 'Weighted 70% for S&P 500 decisions',
              points: ['Focuses on durable competitive moats', 'Free cash flow and intrinsic value analysis', 'Long-term compounding thesis', 'Prefers franchise businesses with pricing power'],
            },
            {
              name: 'Simons Agent', role: 'Quantitative', color: 'blue',
              weight: 'Weighted 70% for Nasdaq decisions',
              points: ['Pattern recognition and momentum signals', 'Statistical arbitrage opportunities', 'Factor-based return attribution', 'High-frequency data signal processing'],
            },
            {
              name: 'Strategist Agent', role: 'Arbiter & Synthesizer', color: 'emerald',
              weight: 'Final decision authority — 15-stock list',
              points: ['Synthesizes conflicting Buffett vs Simons reports', 'Integrates macroeconomic regime analysis', 'Sets portfolio weights and concentration limits', 'Defines the primary investment thesis'],
            },
            {
              name: 'Risk Agent', role: 'Risk Manager', color: 'red',
              weight: 'r > 0.85 triggers Red Alert',
              points: ['Calculates portfolio Beta (weighted average)', 'Pearson Correlation Matrix on 180-day returns', 'Issues Red Alerts for sector clumping (r > 0.85)', 'Enforces 15-stock concentration limit'],
            },
          ].map(a => (
            <div key={a.name} className={`bg-slate-800/40 border border-${a.color}-500/20 rounded-xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className={`text-${a.color}-400 font-bold`}>{a.name}</p>
                  <p className="text-slate-400 text-xs">{a.role}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded bg-${a.color}-500/10 text-${a.color}-400 border border-${a.color}-500/20`}>{a.weight}</span>
              </div>
              <ul className="space-y-1">
                {a.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-slate-400 text-xs">
                    <span className={`text-${a.color}-500 mt-0.5`}>›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Framework */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Risk Management Framework</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: '15-Stock Concentration', icon: '🎯', desc: 'Strict limit ensures only the highest-conviction ideas are funded. No position dilution from mediocre picks.' },
            { title: 'Pearson Correlation Gate', icon: '🔴', desc: 'r > 0.85 on 180-day returns triggers a Red Alert to prevent sector clumping and hidden correlation risk.' },
            { title: 'Tiered Cash Strategy', icon: '💵', desc: '12–18% reserve deployed in SGOV/MINT to maximize yield when valuations are stretched. Cash is a weapon.' },
          ].map(f => (
            <div key={f.title} className="bg-slate-800/40 border border-slate-700 rounded-xl p-5">
              <p className="text-2xl mb-3">{f.icon}</p>
              <p className="text-white font-semibold text-sm mb-2">{f.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Auditor Agent */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-bold text-lg mb-2">Performance Auditor Agent</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          An <span className="text-white">independent auditor</span> wakes up daily to fetch live quotes and reconstruct the 30-day market pulse.
          It tracks the <span className="text-amber-400">0.1% friction cost</span> per trade to ensure reported CAGR is realistic and net-of-fees,
          and runs a <span className="text-emerald-400">Strategy Alignment Audit</span> — verifying that portfolio weights correlate with the current macro regime.
        </p>
        <div className="flex gap-4 flex-wrap text-xs text-slate-400">
          {['Daily live quote refresh', '0.1% friction per trade', 'Alpha vs benchmark tracking', 'Strategy Alignment Audit', 'Macro regime verification'].map(t => (
            <span key={t} className="bg-slate-700 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      {/* Version History */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Version Control & Historical Log</h2>
        <div className="space-y-3">
          {VERSIONS.map(v => (
            <div key={v.version} className={`bg-slate-800/40 border ${v.color === 'emerald' ? 'border-emerald-500/30' : 'border-slate-700'} rounded-xl p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-mono font-bold ${v.color === 'emerald' ? 'text-emerald-400' : v.color === 'blue' ? 'text-blue-400' : 'text-slate-400'}`}>{v.version}</span>
                {v.label && <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2 py-0.5 rounded-full font-semibold">{v.label}</span>}
                <span className="text-slate-500 text-xs">{v.date}</span>
              </div>
              <ul className="space-y-1">
                {v.changes.map(c => (
                  <li key={c} className="flex items-start gap-2 text-slate-400 text-xs">
                    <span className="text-emerald-500 mt-0.5">+</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Rebalancing Log */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Strategist Rebalancing Log</h2>
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {['Date', 'Version', 'Regime', 'Action'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-slate-400 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {REBALANCE_LOG.map(r => (
                <tr key={r.date} className="hover:bg-slate-700/20">
                  <td className="px-5 py-3 text-slate-300 font-mono text-xs">{r.date}</td>
                  <td className="px-5 py-3"><span className="text-emerald-400 font-mono text-xs">{r.version}</span></td>
                  <td className="px-5 py-3"><span className="text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded">{r.regime}</span></td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
