import { PORTFOLIO, CORRELATION_MATRIX, TICKERS, SECTOR_ALLOCATION } from '../data/portfolioData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RED_ALERT_THRESHOLD = 0.85;

function getColor(r) {
  if (r === 1.0) return '#1e293b';
  if (r > 0.85) return '#ef444480';
  if (r > 0.70) return '#f97316' + '60';
  if (r > 0.50) return '#eab308' + '40';
  if (r > 0.30) return '#22c55e' + '30';
  return '#22c55e' + '15';
}
function getTextColor(r) {
  if (r === 1.0) return 'text-slate-600';
  if (r > 0.85) return 'text-red-400 font-bold';
  if (r > 0.70) return 'text-orange-400';
  if (r > 0.50) return 'text-yellow-400';
  return 'text-emerald-400';
}

// Find all red-alert pairs
const redAlerts = [];
TICKERS.forEach((a, i) => {
  TICKERS.forEach((b, j) => {
    if (j > i) {
      const r = CORRELATION_MATRIX[a][j];
      if (r > RED_ALERT_THRESHOLD) {
        redAlerts.push({ a, b, r });
      }
    }
  });
});

const portfolioBeta = (PORTFOLIO.reduce((s, h) => s + h.beta * h.weight, 0) / 100).toFixed(2);

export default function RiskAudit() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Risk Audit</h1>
        <p className="text-slate-400 text-sm mt-1">Pearson Correlation Matrix · Beta Analysis · Sector Diversification</p>
      </div>

      {/* Risk Summary Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Beta', value: portfolioBeta, sub: 'Weighted avg vs market', color: parseFloat(portfolioBeta) > 1.2 ? 'text-red-400' : 'text-emerald-400' },
          { label: 'Red Alerts', value: redAlerts.length, sub: `Pairs with r > ${RED_ALERT_THRESHOLD}`, color: redAlerts.length > 0 ? 'text-red-400' : 'text-emerald-400' },
          { label: 'Concentration Limit', value: '15 stocks', sub: 'Max positions enforced', color: 'text-emerald-400' },
          { label: 'Cash Buffer', value: '14.4%', sub: 'SGOV/MINT deployed', color: 'text-amber-400' },
        ].map(card => (
          <div key={card.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-slate-500 text-xs mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Red Alerts */}
      {redAlerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-red-400 text-lg">🔴</span>
            <h3 className="text-red-400 font-semibold">Correlation Red Alerts — r &gt; {RED_ALERT_THRESHOLD}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {redAlerts.map(({ a, b, r }) => (
              <div key={`${a}-${b}`} className="bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-1.5 text-sm">
                <span className="text-white font-mono font-bold">{a} ↔ {b}</span>
                <span className="text-red-400 ml-2 font-mono">r = {r.toFixed(2)}</span>
                <span className="text-red-300 text-xs ml-2">Sector clumping risk</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700">
            <h2 className="text-white font-semibold text-sm">Pearson Correlation Matrix (r) — 180-day returns</h2>
          </div>
          <div className="overflow-auto p-2">
            <table className="text-xs">
              <thead>
                <tr>
                  <th className="w-10 p-1 text-slate-500"></th>
                  {TICKERS.map(t => (
                    <th key={t} className="p-1 text-slate-400 font-mono text-center w-10 whitespace-nowrap" style={{ fontSize: '10px' }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TICKERS.map((rowTicker, i) => (
                  <tr key={rowTicker}>
                    <td className="p-1 text-slate-400 font-mono whitespace-nowrap font-semibold" style={{ fontSize: '10px' }}>{rowTicker}</td>
                    {TICKERS.map((colTicker, j) => {
                      const r = CORRELATION_MATRIX[rowTicker][j];
                      return (
                        <td
                          key={colTicker}
                          className={`p-1 text-center font-mono w-10 ${getTextColor(r)}`}
                          style={{ background: getColor(r), fontSize: '10px' }}
                        >
                          {r === 1.0 ? '—' : r.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 mt-3 px-2 text-xs">
              {[
                { color: 'bg-red-400', label: 'r > 0.85 🔴 Alert' },
                { color: 'bg-orange-400', label: 'r > 0.70 High' },
                { color: 'bg-yellow-400', label: 'r > 0.50 Medium' },
                { color: 'bg-emerald-400', label: 'r ≤ 0.50 Low' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-slate-400">
                  <div className={`w-3 h-3 rounded ${l.color} opacity-70`} />
                  <span style={{ fontSize: '10px' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Allocation Pie + Beta Table */}
        <div className="space-y-4">
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
            <h2 className="text-white font-semibold text-sm mb-3">Sector Allocation</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={SECTOR_ALLOCATION} dataKey="weight" nameKey="sector" cx="50%" cy="50%" outerRadius={80} label={({ sector, weight }) => `${weight}%`} labelLine={false}>
                  {SECTOR_ALLOCATION.map((s) => <Cell key={s.sector} fill={s.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Beta Table */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700">
              <h2 className="text-white font-semibold text-sm">Beta Risk Ranking</h2>
            </div>
            <div className="divide-y divide-slate-700/30 max-h-48 overflow-auto">
              {[...PORTFOLIO].sort((a, b) => b.beta - a.beta).map(s => (
                <div key={s.symbol} className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono font-bold text-sm">{s.symbol}</span>
                    <span className="text-slate-400 text-xs">{s.sector}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-700 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${s.beta > 1.5 ? 'bg-red-500' : s.beta > 1.0 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(s.beta / 2.5 * 100, 100)}%` }} />
                    </div>
                    <span className={`font-mono text-sm font-bold ${s.beta > 1.5 ? 'text-red-400' : s.beta > 1.0 ? 'text-orange-400' : 'text-emerald-400'}`}>
                      β {s.beta.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
