import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';

const emptyForm = { symbol: '', name: '', shares: '', avgCost: '', currentPrice: '' };

export default function Portfolio() {
  const { holdings, addHolding, removeHolding } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleSubmit(e) {
    e.preventDefault();
    addHolding({
      symbol: form.symbol.toUpperCase(),
      name: form.name,
      shares: parseFloat(form.shares),
      avgCost: parseFloat(form.avgCost),
      currentPrice: parseFloat(form.currentPrice),
    });
    setForm(emptyForm);
    setShowModal(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Holding
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-right">Shares</th>
              <th className="px-4 py-3 text-right">Avg Cost</th>
              <th className="px-4 py-3 text-right">Current Price</th>
              <th className="px-4 py-3 text-right">Market Value</th>
              <th className="px-4 py-3 text-right">Gain/Loss ($)</th>
              <th className="px-4 py-3 text-right">Gain/Loss (%)</th>
              <th className="px-4 py-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => {
              const marketValue = h.shares * h.currentPrice;
              const cost = h.shares * h.avgCost;
              const gl = marketValue - cost;
              const glPct = cost > 0 ? (gl / cost) * 100 : 0;
              const glColor = gl >= 0 ? 'text-emerald-400' : 'text-red-400';
              const sign = gl >= 0 ? '+' : '';
              return (
                <tr key={h.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-900/20'}`}>
                  <td className="px-4 py-3 font-bold text-white">{h.symbol}</td>
                  <td className="px-4 py-3 text-slate-300">{h.name}</td>
                  <td className="px-4 py-3 text-right text-slate-300">{h.shares}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${h.avgCost.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-slate-300">${h.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-white font-medium">${marketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className={`px-4 py-3 text-right font-medium ${glColor}`}>{sign}${Math.abs(gl).toFixed(2)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${glColor}`}>{sign}{glPct.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeHolding(h.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors font-bold text-lg leading-none"
                      title="Remove"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-white font-bold text-lg mb-4">Add Holding</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { field: 'symbol', label: 'Symbol', placeholder: 'AAPL' },
                { field: 'name', label: 'Company Name', placeholder: 'Apple Inc.' },
                { field: 'shares', label: 'Shares', placeholder: '10', type: 'number' },
                { field: 'avgCost', label: 'Average Cost ($)', placeholder: '150.00', type: 'number' },
                { field: 'currentPrice', label: 'Current Price ($)', placeholder: '189.30', type: 'number' },
              ].map(({ field, label, placeholder, type = 'text' }) => (
                <div key={field}>
                  <label className="block text-slate-400 text-xs mb-1">{label}</label>
                  <input
                    type={type}
                    step="any"
                    required
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setForm(emptyForm); }}
                  className="flex-1 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
