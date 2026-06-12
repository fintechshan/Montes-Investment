import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function AddHoldingModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ symbol: '', name: '', shares: '', avgCost: '', currentPrice: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      symbol: form.symbol.toUpperCase(),
      name: form.name,
      shares: parseFloat(form.shares),
      avgCost: parseFloat(form.avgCost),
      currentPrice: parseFloat(form.currentPrice),
    });
    onClose();
  };

  const field = (label, key, type = 'text') => (
    <div>
      <label className="block text-slate-400 text-sm mb-1">{label}</label>
      <input
        type={type}
        required
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Add Holding</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {field('Symbol', 'symbol')}
          {field('Company Name', 'name')}
          {field('Shares', 'shares', 'number')}
          {field('Average Cost ($)', 'avgCost', 'number')}
          {field('Current Price ($)', 'currentPrice', 'number')}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-white font-medium transition-colors text-sm">
              Add Holding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { holdings, addHolding, removeHolding } = usePortfolio();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your holdings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-medium transition-colors text-sm"
        >
          <span className="text-lg leading-none">+</span> Add Holding
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {['Symbol', 'Name', 'Shares', 'Avg Cost', 'Current Price', 'Market Value', 'Gain/Loss ($)', 'Gain/Loss (%)', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {holdings.map(h => {
                const marketValue = h.shares * h.currentPrice;
                const cost = h.shares * h.avgCost;
                const gl = marketValue - cost;
                const glPct = cost > 0 ? (gl / cost) * 100 : 0;
                const color = gl >= 0 ? 'text-green-400' : 'text-red-400';
                return (
                  <tr key={h.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">{h.symbol}</td>
                    <td className="px-4 py-3 text-slate-300">{h.name}</td>
                    <td className="px-4 py-3 text-slate-300">{h.shares}</td>
                    <td className="px-4 py-3 text-slate-300">{fmt(h.avgCost)}</td>
                    <td className="px-4 py-3 text-slate-300">{fmt(h.currentPrice)}</td>
                    <td className="px-4 py-3 text-white font-medium">{fmt(marketValue)}</td>
                    <td className={`px-4 py-3 font-medium ${color}`}>{gl >= 0 ? '+' : ''}{fmt(gl)}</td>
                    <td className={`px-4 py-3 font-medium ${color}`}>{glPct >= 0 ? '+' : ''}{glPct.toFixed(2)}%</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeHolding(h.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors font-bold text-lg leading-none"
                        title="Remove holding"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <AddHoldingModal onClose={() => setShowModal(false)} onAdd={addHolding} />}
    </div>
  );
}
