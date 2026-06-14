import { useState } from 'react';
import { FUNDS, HOLDINGS, FILING_QUARTERS, INSTITUTIONAL_TRENDS, getChangeSummary, getNextFilingDate } from '../data/f13Data';

const CHANGE_STYLE = {
  NEW:      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  INCREASED:'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  REDUCED:  'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  EXITED:   'bg-red-500/20 text-red-400 border border-red-500/30',
};

const COLOR_MAP = {
  blue:    { border: 'border-blue-500/30',    text: 'text-blue-400',    bg: 'bg-blue-500/10',    dot: 'bg-blue-500' },
  purple:  { border: 'border-purple-500/30',  text: 'text-purple-400',  bg: 'bg-purple-500/10',  dot: 'bg-purple-500' },
  amber:   { border: 'border-amber-500/30',   text: 'text-amber-400',   bg: 'bg-amber-500/10',   dot: 'bg-amber-500' },
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
};

function ChangeTag({ change }) {
  if (!change) return null;
  return <span className={`text-xs px-2 py-0.5 rounded font-semibold ${CHANGE_STYLE[change]}`}>{change}</span>;
}

function SharesDelta({ holding }) {
  if (!holding.change || holding.change === 'NEW' || holding.change === 'EXITED') return null;
  const delta = holding.shares - (holding.prev ?? holding.shares);
  return (
    <span className={`text-xs font-mono ${delta > 0 ? 'text-blue-400' : 'text-amber-400'}`}>
      {delta > 0 ? '+' : ''}{delta.toLocaleString()}k
    </span>
  );
}

function FundPanel({ fund, quarter }) {
  const holdings = HOLDINGS[fund.id]?.[quarter] ?? [];
  const summary = getChangeSummary(fund.id, quarter);
  const c = COLOR_MAP[fund.color];

  return (
    <div className={`bg-slate-800/40 border ${c.border} rounded-xl overflow-hidden`}>
      <div className="px-5 py-4 border-b border-slate-700">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className={`w-2 h-2 rounded-full ${c.dot}`} />
              <p className={`font-bold text-sm ${c.text}`}>{fund.name}</p>
            </div>
            <p className="text-slate-400 text-xs ml-4">{fund.manager} · {fund.aum} AUM · {fund.style}</p>
            <p className={`text-xs ml-4 mt-1 ${c.text} opacity-80`}>Signal: {fund.signal}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {summary.newPositions.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">+{summary.newPositions.length} NEW</span>
            )}
            {summary.exited.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">-{summary.exited.length} EXITED</span>
            )}
            {summary.increased.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">↑{summary.increased.length}</span>
            )}
            {summary.reduced.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">↓{summary.reduced.length}</span>
            )}
          </div>
        </div>
      </div>

      {holdings.length === 0 ? (
        <p className="text-slate-500 text-sm px-5 py-4">No data available for this quarter.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-4 py-2 text-left text-slate-500 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-2 text-right text-slate-500 uppercase tracking-wider">Shares (000s)</th>
                <th className="px-4 py-2 text-right text-slate-500 uppercase tracking-wider">Value ($M)</th>
                <th className="px-4 py-2 text-right text-slate-500 uppercase tracking-wider">% Portfolio</th>
                <th className="px-4 py-2 text-center text-slate-500 uppercase tracking-wider">Change</th>
                <th className="px-4 py-2 text-right text-slate-500 uppercase tracking-wider">Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {holdings.map(h => (
                <tr key={h.symbol} className={`hover:bg-slate-700/20 ${h.change === 'NEW' ? 'bg-emerald-500/5' : ''}`}>
                  <td className="px-4 py-2.5">
                    <span className="text-white font-mono font-bold">{h.symbol}</span>
                    <span className="text-slate-400 ml-2">{h.name}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-300 font-mono">{h.shares.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-slate-300 font-mono">${h.value.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-14 bg-slate-700 rounded-full h-1">
                        <div className={`h-1 rounded-full ${c.dot}`} style={{ width: `${Math.min(h.pct / 30 * 100, 100)}%` }} />
                      </div>
                      <span className="text-slate-300 font-mono w-10 text-right">{h.pct.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center"><ChangeTag change={h.change} /></td>
                  <td className="px-4 py-2.5 text-right"><SharesDelta holding={h} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function F13Tracker() {
  const [quarter, setQuarter] = useState(FILING_QUARTERS[0]);
  const [activeFund, setActiveFund] = useState('all');
  const nextFiling = getNextFilingDate();

  const visibleFunds = activeFund === 'all' ? FUNDS : FUNDS.filter(f => f.id === activeFund);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">13-F Institutional Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">
            Strategist monitors: <span className="text-blue-400">Bridgewater</span> · <span className="text-purple-400">Renaissance</span> · <span className="text-amber-400">Situation Awareness</span> · <span className="text-emerald-400">Berkshire</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-sm font-medium">Next Filing: {nextFiling}</span>
        </div>
      </div>

      {/* Strategist Trend Analysis */}
      <div>
        <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          Strategist — Major Trends & Signals (Q4 2024)
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {INSTITUTIONAL_TRENDS.map(t => (
            <div key={t.trend} className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{t.icon}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${
                  t.signal === 'BULLISH' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : t.signal === 'INCREASING' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                  : 'text-red-400 bg-red-500/10 border-red-500/30'
                }`}>{t.signal}</span>
              </div>
              <p className="text-white text-xs font-semibold mb-1">{t.trend}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-2">{t.desc}</p>
              <div className="flex gap-1 flex-wrap">
                {t.stocks.map(s => (
                  <span key={s} className="text-xs font-mono bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
        <span className="text-blue-400 text-base mt-0.5">ℹ</span>
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-white font-semibold">SEC 13-F filings</span> are required quarterly disclosures for institutional investment managers with &gt;$100M in AUM.
          Filings are due <span className="text-amber-400">45 days after quarter end</span> — Q4: Feb 14 · Q1: May 15 · Q2: Aug 14 · Q3: Nov 14.
          Data reflects holdings as of quarter-end; positions may have changed since filing.
        </p>
      </div>

      {/* Quarter + Fund Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Quarter:</span>
          <div className="flex gap-1">
            {FILING_QUARTERS.map(q => (
              <button
                key={q}
                onClick={() => setQuarter(q)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  quarter === q
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Fund:</span>
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveFund('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFund === 'all'
                  ? 'bg-slate-600 text-white border border-slate-500'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
              }`}
            >
              All 4 Funds
            </button>
            {FUNDS.map(f => {
              const c = COLOR_MAP[f.color];
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFund(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeFund === f.id
                      ? `${c.bg} ${c.text} border ${c.border}`
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {f.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fund Holdings */}
      <div className="space-y-6">
        {visibleFunds.map(fund => (
          <FundPanel key={fund.id} fund={fund} quarter={quarter} />
        ))}
      </div>

      {/* Cross-Fund Consensus */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-2">Cross-Fund Consensus — {quarter}</h2>
        <p className="text-slate-400 text-xs mb-4">Stocks held by 2+ of the 4 tracked funds (institutional conviction)</p>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const symbolCount = {};
            FUNDS.forEach(fund => {
              (HOLDINGS[fund.id]?.[quarter] ?? []).forEach(h => {
                if (!symbolCount[h.symbol]) symbolCount[h.symbol] = { count: 0, name: h.name };
                symbolCount[h.symbol].count++;
              });
            });
            return Object.entries(symbolCount)
              .filter(([, v]) => v.count >= 2)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([symbol, v]) => (
                <div key={symbol} className="flex items-center gap-2 bg-slate-700/40 border border-slate-600 rounded-lg px-3 py-2">
                  <span className="text-white font-mono font-bold text-sm">{symbol}</span>
                  <span className="text-slate-400 text-xs">{v.name}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-1.5 py-0.5 rounded font-semibold">
                    {v.count}/4 funds
                  </span>
                </div>
              ));
          })()}
        </div>
      </div>
    </div>
  );
}
