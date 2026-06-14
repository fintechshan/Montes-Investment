import { PORTFOLIO, MACRO_METRICS, FUND_METRICS } from '../data/portfolioData';
import { ANALYST_RATINGS, MACRO_VIEWS, getConsensus } from '../data/analystData';
import { INSTITUTIONAL_TRENDS } from '../data/f13Data';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function AgentBadge({ agent }) {
  const styles = {
    Buffett: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    Simons:  'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Both:    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    Risk:    'bg-slate-500/20 text-slate-400 border border-slate-500/30',
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

function RatingBadge({ rating }) {
  const buy = ['BUY', 'OVERWEIGHT', 'OUTPERFORM'];
  const sell = ['SELL', 'UNDERWEIGHT', 'UNDERPERFORM'];
  const cls = buy.includes(rating)
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : sell.includes(rating)
    ? 'text-red-400 bg-red-500/10 border-red-500/20'
    : 'text-slate-400 bg-slate-700 border-slate-600';
  const short = rating
    .replace('OVERWEIGHT', 'OW')
    .replace('OUTPERFORM', 'OP')
    .replace('UNDERWEIGHT', 'UW')
    .replace('MARKET PERFORM', 'MP');
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded border font-mono font-semibold ${cls}`}>{short}</span>
  );
}

const CONVICTION_COLOR = {
  BULLISH: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'CAUTIOUSLY BULLISH': 'text-green-400 bg-green-500/10 border-green-500/20',
  NEUTRAL: 'text-slate-400 bg-slate-700 border-slate-600',
  BEARISH: 'text-red-400 bg-red-500/10 border-red-500/20',
};

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
      <div className="grid grid-cols-5 gap-3">
        {[
          {
            name: 'Buffett Agent', role: 'Value Investor', color: 'amber', weight: 'SPY 70%',
            points: ['Moats & FCF analysis', 'Intrinsic value pricing', 'Long-term compounding'],
          },
          {
            name: 'Simons Agent', role: 'Quantitative', color: 'blue', weight: 'QQQ 70%',
            points: ['Pattern recognition', 'Statistical arbitrage', 'Momentum signals'],
          },
          {
            name: 'Strategist', role: 'Arbiter & Synthesizer', color: 'emerald', weight: 'Final Arbiter',
            points: [
              'Synthesizes GS · MS · UBS · Bernstein',
              'Monitors: Bridgewater · Renaissance · Situation Awareness · Berkshire 13-F',
              '→ 15-stock conviction list',
            ],
          },
          {
            name: 'Risk Agent', role: 'Risk Manager', color: 'red', weight: 'r > 0.85 alert',
            points: ['Portfolio Beta (weighted)', 'Pearson r on 180d returns', 'Sector clumping alerts'],
          },
          {
            name: 'Auditor', role: 'Performance Auditor', color: 'slate', weight: '0.1% friction',
            points: ['Alpha vs benchmark', 'Friction cost tracking', 'Daily quote refresh'],
          },
        ].map(a => (
          <div key={a.name} className={`bg-slate-800/60 border border-${a.color}-500/20 rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full bg-${a.color}-500`} />
              <p className="text-white text-xs font-semibold">{a.name}</p>
            </div>
            <p className={`text-${a.color}-400 text-xs mb-1`}>{a.role}</p>
            <p className={`text-${a.color}-300 text-xs font-mono mb-2`}>{a.weight}</p>
            <ul className="space-y-1">
              {a.points.map(p => (
                <li key={p} className="text-slate-400 text-xs leading-snug">{p}</li>
              ))}
            </ul>
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
          {[
            { label: 'CPI', value: MACRO_METRICS.cpi, unit: '%', sub: 'YoY inflation' },
            { label: 'Fed Funds', value: MACRO_METRICS.fedFunds, unit: '%', sub: 'Current rate' },
            { label: 'ISM Mfg', value: MACRO_METRICS.ism, unit: '', sub: MACRO_METRICS.ism < 50 ? '< 50 Contraction' : '> 50 Expansion' },
            { label: '10yr Breakeven', value: MACRO_METRICS.inflation10yr, unit: '%', sub: 'Inflation exp.' },
            { label: 'Equity Weight', value: equityWeight, unit: '%', sub: 'Deployed capital' },
            { label: 'Cash Reserve', value: MACRO_METRICS.cashLevel, unit: '%', sub: `Target: ${MACRO_METRICS.cashTarget}` },
          ].map(c => (
            <div key={c.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-white text-xl font-bold">{c.value}<span className="text-slate-400 text-sm ml-1">{c.unit}</span></p>
              {c.sub && <p className="text-slate-500 text-xs mt-1">{c.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Strategist Synthesis Panel */}
      <div>
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          Strategist Synthesis
          <span className="text-xs font-normal text-slate-400">— synthesizing bank research + institutional 13-F signals</span>
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Bank Research */}
          <div className="bg-slate-800/40 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-white font-medium text-sm">Bank Research — GS · MS · UBS · Bernstein</h3>
              <span className="text-xs text-emerald-400">Q4 2024 Cycle</span>
            </div>
            <div className="px-5 py-3 space-y-2.5 border-b border-slate-700/50">
              {MACRO_VIEWS.map(v => (
                <div key={v.bank} className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-bold font-mono w-8 shrink-0 text-${v.color}-400`}>{v.short}</span>
                    <div className="min-w-0">
                      <p className="text-slate-300 text-xs font-medium truncate">{v.topTheme}</p>
                      <p className="text-slate-500 text-xs">{v.regime} · SPX {v.spxTarget.toLocaleString()} · {v.fedCuts}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border font-semibold shrink-0 ${CONVICTION_COLOR[v.conviction] ?? CONVICTION_COLOR.NEUTRAL}`}>
                    {v.conviction}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 space-y-2">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Stock Ratings Consensus</p>
              {ANALYST_RATINGS.slice(0, 7).map(r => {
                const consensus = getConsensus(r);
                return (
                  <div key={r.symbol} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-bold text-xs w-12">{r.symbol}</span>
                      <div className="flex gap-1">
                        {['gs', 'ms', 'ubs', 'bernstein'].map(b => (
                          <RatingBadge key={b} rating={r[b]?.rating ?? 'NEUTRAL'} />
                        ))}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${consensus.bg} ${consensus.color}`}>
                      {consensus.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Institutional 13-F Signals */}
          <div className="bg-slate-800/40 border border-blue-500/20 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-white font-medium text-sm">13-F Institutional Signals</h3>
              <span className="text-xs text-blue-400">Bridgewater · Renaissance · SituAware · Berkshire</span>
            </div>
            <div className="divide-y divide-slate-700/30">
              {INSTITUTIONAL_TRENDS.map(t => (
                <div key={t.trend} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span className="text-white text-xs font-semibold">{t.trend}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border font-semibold shrink-0 ${
                      t.signal === 'BULLISH' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      : t.signal === 'INCREASING' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                      : 'text-red-400 bg-red-500/10 border-red-500/30'
                    }`}>{t.signal}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-1.5">{t.desc}</p>
                  <div className="flex gap-1 flex-wrap">
                    {t.stocks.map(s => (
                      <span key={s} className="text-xs font-mono bg-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
