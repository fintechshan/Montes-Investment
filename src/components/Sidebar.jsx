import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Intelligence', sub: 'Portfolio & Macro', icon: '◈' },
  { to: '/risk', label: 'Risk Audit', sub: 'Correlation & Beta', icon: '⚠' },
  { to: '/backtest', label: 'Backtest', sub: '20-yr simulation', icon: '◉' },
  { to: '/auditor', label: 'Auditor', sub: 'Alpha & Trade Log', icon: '✦' },
  { to: '/13f', label: '13-F Tracker', sub: 'Institutional Moves', icon: '🏦' },
  { to: '/about', label: 'About', sub: 'Architecture & Log', icon: 'ℹ' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-base">M</div>
          <div>
            <div className="font-bold text-white leading-tight">Montes Equity</div>
            <div className="text-emerald-400 text-xs">Co-Pilot Fund v2.2.0</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-slate-400 text-xs">"AI & Energy Supercycle"</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ to, label, sub, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>
            <div>
              <div className="text-sm font-medium leading-tight">{label}</div>
              <div className="text-xs opacity-60 leading-tight">{sub}</div>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>20-yr CAGR</span><span className="text-emerald-400 font-semibold">+17.2%</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Cash Reserve</span><span className="text-amber-400 font-semibold">14.4%</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Positions</span><span className="text-white font-semibold">15 / 15</span>
        </div>
      </div>
    </aside>
  );
}
