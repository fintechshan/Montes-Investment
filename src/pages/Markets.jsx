import { useState, useEffect } from 'react';
import { MOCK_MARKET_DATA } from '../data/mockData';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function Markets() {
  const [data, setData] = useState(MOCK_MARKET_DATA);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
    if (apiKey) {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${apiKey}`)
        .then(r => r.json())
        .then(json => {
          if (json['Global Quote'] && json['Global Quote']['05. price']) {
            setIsLive(true);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Markets</h1>
          <p className="text-slate-400 text-sm mt-1">Top 10 stocks</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isLive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-700 text-slate-400 border border-slate-600'}`}>
          {isLive ? '● Live Data' : '◌ Mock Data'}
        </span>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {['Symbol', 'Name', 'Price', 'Change', 'Change %', 'Volume', 'Market Cap'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {data.map(s => {
                const color = s.change >= 0 ? 'text-green-400' : 'text-red-400';
                return (
                  <tr key={s.symbol} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">{s.symbol}</td>
                    <td className="px-4 py-3 text-slate-300">{s.name}</td>
                    <td className="px-4 py-3 text-white font-medium">{fmt(s.price)}</td>
                    <td className={`px-4 py-3 font-medium ${color}`}>{s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}</td>
                    <td className={`px-4 py-3 font-medium ${color}`}>{s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-slate-400">{s.volume}</td>
                    <td className="px-4 py-3 text-slate-400">{s.marketCap}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
