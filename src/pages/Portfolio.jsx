import { useState } from 'react'
import { usePortfolio } from '../hooks/usePortfolio'
import { MOCK_STOCKS } from '../data/mockMarkets'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

function AddModal({ onAdd, onClose }) {
  const [symbol, setSymbol] = useState('')
  const [shares, setShares] = useState('')
  const [avgCost, setAvgCost] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const sym = symbol.toUpperCase().trim()
    const sh = parseFloat(shares)
    const ac = parseFloat(avgCost)
    if (!sym) return setError('Symbol is required')
    if (isNaN(sh) || sh <= 0) return setError('Enter a valid number of shares')
    if (isNaN(ac) || ac <= 0) return setError('Enter a valid average cost')
    onAdd(sym, sh, ac)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-white font-bold text-lg mb-4">Add Holding</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Symbol</label>
            <input
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
              placeholder="e.g. AAPL"
              className="w-full bg-[#111d35] border border-[#1a2744] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Shares</label>
            <input
              type="number"
              value={shares}
              onChange={e => setShares(e.target.value)}
              placeholder="0"
              min="0.01"
              step="0.01"
              className="w-full bg-[#111d35] border border-[#1a2744] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Avg Cost per Share ($)</label>
            <input
              type="number"
              value={avgCost}
              onChange={e => setAvgCost(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className="w-full bg-[#111d35] border border-[#1a2744] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-[#1a2744] text-slate-400 hover:text-white text-sm transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { holdings, totalValue, totalGain, totalGainPct, addHolding, removeHolding } = usePortfolio()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your investment holdings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + Add Holding
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">{fmt(totalValue)}</p>
        </div>
        <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Gain / Loss</p>
          <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalGain >= 0 ? '+' : ''}{fmt(totalGain)}
          </p>
          <p className={`text-sm mt-1 ${totalGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalGainPct >= 0 ? '+' : ''}{totalGainPct.toFixed(2)}%
          </p>
        </div>
        <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Positions</p>
          <p className="text-2xl font-bold text-white">{holdings.length}</p>
        </div>
      </div>

      {/* Holdings table */}
      <div className="bg-[#0d1526] border border-[#1a2744] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-[#1a2744]">
              <th className="text-left px-6 py-3">Symbol</th>
              <th className="text-right px-6 py-3">Shares</th>
              <th className="text-right px-6 py-3">Avg Cost</th>
              <th className="text-right px-6 py-3">Current Price</th>
              <th className="text-right px-6 py-3">Value</th>
              <th className="text-right px-6 py-3">Gain/Loss</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {holdings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-slate-500 py-12">No holdings yet. Add one to get started.</td>
              </tr>
            ) : (
              holdings.map(h => (
                <tr key={h.id} className="border-b border-[#1a2744]/50 hover:bg-[#111d35] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{h.symbol}</td>
                  <td className="px-6 py-4 text-right text-slate-300">{h.shares}</td>
                  <td className="px-6 py-4 text-right text-slate-300">{fmt(h.avgCost)}</td>
                  <td className="px-6 py-4 text-right text-white">{fmt(h.price)}</td>
                  <td className="px-6 py-4 text-right font-medium text-white">{fmt(h.value)}</td>
                  <td className={`px-6 py-4 text-right font-medium ${h.gain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {h.gain >= 0 ? '+' : ''}{fmt(h.gain)}
                    <span className="block text-xs opacity-80">{h.gainPct >= 0 ? '+' : ''}{h.gainPct.toFixed(2)}%</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => removeHolding(h.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && <AddModal onAdd={addHolding} onClose={() => setShowModal(false)} />}
    </div>
  )
}
