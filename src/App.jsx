import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Intelligence from './pages/Intelligence';
import RiskAudit from './pages/RiskAudit';
import Backtest from './pages/Backtest';
import Auditor from './pages/Auditor';
import F13Tracker from './pages/F13Tracker';
import About from './pages/About';

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Intelligence />} />
            <Route path="/risk" element={<RiskAudit />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/auditor" element={<Auditor />} />
            <Route path="/13f" element={<F13Tracker />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
