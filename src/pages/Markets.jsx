import { MOCK_STOCKS } from '../data/mockMarkets'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

export default function Markets() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Markets</h1>
        <p className="text-slate-400 text-sm mt-1">Live-style quotes for top stocks</p>
        <p className="text-slate-500 text-xs mt-1">Prices are simulated demo data</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Gainers Today</p>
          <p className="text-2xl font-bold text-emerald-400">
            {MOCK_STOCKS.filter(s => s.change > 0).length}
          </p>
        </div>
        <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Losers Today</p>
          <p className="text-2xl font-bold text-red-400">
            {MOCK_STOCKS.filter(s => s.change < 0).length}
          </p>
        </div>
      </div>

      <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a2744]">
          <h2 className="text-white font-semibold">Top 10 Stocks</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-[#1a2744]">
              <th className="text-left px-6 py-3">Symbol</th>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-right px-6 py-3">Price</th>
              <th className="text-right px-6 py-3">Change</th>
              <th className="text-right px-6 py-3">Change %</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STOCKS.map(s => (
              <tr key={s.symbol} className="border-b border-[#1a2744]/50 hover:bg-[#111d35] transition-colors">
                <td className="px-6 py-4 font-bold text-white">{s.symbol}</td>
                <td className="px-6 py-4 text-slate-300">{s.name}</td>
                <td className="px-6 py-4 text-right font-medium text-white">{fmt(s.price)}</td>
                <td className={`px-6 py-4 text-right font-medium ${s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {s.change >= 0 ? '+' : ''}{fmt(s.change)}
                </td>
                <td className={`px-6 py-4 text-right font-medium ${s.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${s.changePct >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
