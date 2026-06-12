import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Markets from './pages/Markets'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/portfolio', label: 'Portfolio', icon: '◈' },
  { to: '/markets', label: 'Markets', icon: '◉' },
]

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#0a0f1e]">
        {/* Sidebar */}
        <aside className="w-56 bg-[#0d1526] border-r border-[#1a2744] flex flex-col flex-shrink-0">
          <div className="px-6 py-6 border-b border-[#1a2744]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
              <div>
                <p className="text-white font-semibold text-sm leading-none">Montes</p>
                <p className="text-slate-400 text-xs mt-0.5">Investment</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#162040]'
                  }`
                }
              >
                <span className="text-base">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-[#1a2744]">
            <p className="text-xs text-slate-500">© 2025 Montes Invest</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/markets" element={<Markets />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
