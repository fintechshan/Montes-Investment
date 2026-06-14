// 15-stock high-conviction portfolio
export const PORTFOLIO = [
  { id: 1, symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', exchange: 'NASDAQ', price: 131.38, weight: 9.2, buffett: 72, simons: 97, conviction: 91, beta: 1.74, thesis: 'AI compute monopoly, data center supercycle', agent: 'Simons' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', exchange: 'NASDAQ', price: 415.20, weight: 8.8, buffett: 91, simons: 89, conviction: 90, beta: 0.91, thesis: 'Cloud + AI platform, durable competitive moat', agent: 'Both' },
  { id: 3, symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', exchange: 'NASDAQ', price: 189.30, weight: 8.1, buffett: 95, simons: 78, conviction: 88, beta: 0.82, thesis: 'Ecosystem moat, services flywheel, capital return', agent: 'Buffett' },
  { id: 4, symbol: 'META', name: 'Meta Platforms', sector: 'Technology', exchange: 'NASDAQ', price: 527.60, weight: 7.4, buffett: 78, simons: 94, conviction: 88, beta: 1.21, thesis: 'Social monopoly + AI infrastructure buildout', agent: 'Simons' },
  { id: 5, symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', exchange: 'NASDAQ', price: 175.40, weight: 7.2, buffett: 87, simons: 91, conviction: 89, beta: 1.05, thesis: 'Search moat + cloud + AI Gemini flywheel', agent: 'Both' },
  { id: 6, symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', exchange: 'NYSE', price: 172.85, weight: 6.8, buffett: 84, simons: 88, conviction: 87, beta: 1.18, thesis: 'Irreplaceable fab monopoly for AI chips', agent: 'Both' },
  { id: 7, symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Disc.', exchange: 'NASDAQ', price: 185.60, weight: 6.5, buffett: 82, simons: 86, conviction: 85, beta: 1.14, thesis: 'AWS cloud + logistics moat + AI integration', agent: 'Both' },
  { id: 8, symbol: 'LLY', name: 'Eli Lilly & Co.', sector: 'Healthcare', exchange: 'NYSE', price: 798.45, weight: 6.1, buffett: 88, simons: 85, conviction: 87, beta: 0.54, thesis: 'GLP-1 obesity pipeline, 10yr revenue runway', agent: 'Buffett' },
  { id: 9, symbol: 'CEG', name: 'Constellation Energy', sector: 'Utilities', exchange: 'NASDAQ', price: 238.72, weight: 5.8, buffett: 79, simons: 92, conviction: 87, beta: 0.71, thesis: 'Nuclear AI power deals, carbon-free baseload', agent: 'Simons' },
  { id: 10, symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', exchange: 'NYSE', price: 34.82, weight: 5.4, buffett: 58, simons: 96, conviction: 83, beta: 2.11, thesis: 'AI OS for government + enterprise, AIP platform', agent: 'Simons' },
  { id: 11, symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', exchange: 'NYSE', price: 198.45, weight: 5.2, buffett: 92, simons: 74, conviction: 85, beta: 0.98, thesis: 'Best-in-class bank, fortress balance sheet', agent: 'Buffett' },
  { id: 12, symbol: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy', exchange: 'NYSE', price: 108.32, weight: 4.8, buffett: 87, simons: 68, conviction: 80, beta: 0.77, thesis: 'Low-cost energy producer, 40yr reserve runway', agent: 'Buffett' },
  { id: 13, symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Financials', exchange: 'NYSE', price: 398.20, weight: 4.5, buffett: 98, simons: 65, conviction: 84, beta: 0.62, thesis: 'Diversified value compounder, Buffett direct proxy', agent: 'Buffett' },
  { id: 14, symbol: 'NEE', name: 'NextEra Energy', sector: 'Utilities', exchange: 'NYSE', price: 71.45, weight: 3.8, buffett: 81, simons: 77, conviction: 79, beta: 0.55, thesis: 'Largest renewables operator, AI grid demand', agent: 'Both' },
  { id: 15, symbol: 'SGOV', name: 'SGOV (T-Bill ETF)', sector: 'Cash', exchange: 'NYSE', price: 100.41, weight: 14.4, buffett: 60, simons: 55, conviction: 70, beta: 0.01, thesis: 'Tiered cash reserve — deployed when valuations stretch', agent: 'Risk' },
];

export const MACRO_METRICS = {
  cpi: 3.2,
  fedFunds: 5.33,
  ism: 48.7,
  inflation10yr: 2.31,
  regime: 'Late Cycle / AI Supercycle',
  regimeColor: 'yellow',
  spyWeight: 'Buffett (70%)',
  qqWeight: 'Simons (70%)',
  cashLevel: 14.4,
  cashTarget: '12–18%',
  lastRebalance: '2024-11-15',
};

export const FUND_METRICS = {
  cagr: 17.2,
  sharpe: 1.84,
  maxDrawdown: -28.4,
  alpha: 6.8,
  totalReturn: 2041,
  frictionCost: 0.1,
  stockLimit: 15,
  backtestYears: 20,
  benchmarkCAGR: 10.5,
  nasdaqCAGR: 14.1,
};

// Pearson correlation matrix (15x15) — r values
export const TICKERS = PORTFOLIO.map(s => s.symbol);

export const CORRELATION_MATRIX = {
  NVDA:  [1.00, 0.82, 0.71, 0.79, 0.80, 0.74, 0.68, 0.22, 0.44, 0.88, 0.61, 0.19, 0.41, 0.38, 0.04],
  MSFT:  [0.82, 1.00, 0.83, 0.81, 0.86, 0.77, 0.75, 0.28, 0.41, 0.78, 0.69, 0.22, 0.51, 0.42, 0.03],
  AAPL:  [0.71, 0.83, 1.00, 0.77, 0.84, 0.72, 0.79, 0.31, 0.38, 0.68, 0.71, 0.24, 0.54, 0.44, 0.02],
  META:  [0.79, 0.81, 0.77, 1.00, 0.82, 0.71, 0.74, 0.19, 0.39, 0.81, 0.64, 0.18, 0.43, 0.36, 0.03],
  GOOGL: [0.80, 0.86, 0.84, 0.82, 1.00, 0.75, 0.78, 0.26, 0.40, 0.79, 0.72, 0.21, 0.49, 0.41, 0.02],
  TSM:   [0.74, 0.77, 0.72, 0.71, 0.75, 1.00, 0.66, 0.24, 0.42, 0.76, 0.68, 0.23, 0.45, 0.39, 0.03],
  AMZN:  [0.68, 0.75, 0.79, 0.74, 0.78, 0.66, 1.00, 0.27, 0.37, 0.69, 0.63, 0.20, 0.47, 0.40, 0.02],
  LLY:   [0.22, 0.28, 0.31, 0.19, 0.26, 0.24, 0.27, 1.00, 0.18, 0.21, 0.34, 0.14, 0.38, 0.29, 0.01],
  CEG:   [0.44, 0.41, 0.38, 0.39, 0.40, 0.42, 0.37, 0.18, 1.00, 0.46, 0.36, 0.28, 0.32, 0.61, 0.02],
  PLTR:  [0.88, 0.78, 0.68, 0.81, 0.79, 0.76, 0.69, 0.21, 0.46, 1.00, 0.62, 0.17, 0.40, 0.37, 0.03],
  JPM:   [0.61, 0.69, 0.71, 0.64, 0.72, 0.68, 0.63, 0.34, 0.36, 0.62, 1.00, 0.47, 0.72, 0.38, 0.03],
  XOM:   [0.19, 0.22, 0.24, 0.18, 0.21, 0.23, 0.20, 0.14, 0.28, 0.17, 0.47, 1.00, 0.41, 0.33, 0.02],
  BRK_B: [0.41, 0.51, 0.54, 0.43, 0.49, 0.45, 0.47, 0.38, 0.32, 0.40, 0.72, 0.41, 1.00, 0.35, 0.03],
  NEE:   [0.38, 0.42, 0.44, 0.36, 0.41, 0.39, 0.40, 0.29, 0.61, 0.37, 0.38, 0.33, 0.35, 1.00, 0.02],
  SGOV:  [0.04, 0.03, 0.02, 0.03, 0.02, 0.03, 0.02, 0.01, 0.02, 0.03, 0.03, 0.02, 0.03, 0.02, 1.00],
};

export const SECTOR_ALLOCATION = [
  { sector: 'Technology', weight: 51.9, color: '#6366f1' },
  { sector: 'Cash (SGOV)', weight: 14.4, color: '#94a3b8' },
  { sector: 'Healthcare', weight: 6.1, color: '#10b981' },
  { sector: 'Financials', weight: 9.7, color: '#f59e0b' },
  { sector: 'Energy', weight: 8.6, color: '#f97316' },
  { sector: 'Utilities', weight: 9.6, color: '#06b6d4' },
  { sector: 'Consumer Disc.', weight: 6.5, color: '#ec4899' },
];

export const REBALANCE_LOG = [
  { date: '2024-11-15', version: 'v2.2.0', action: 'Added CEG (nuclear AI thesis). Reduced XOM 6%→4.8%. Raised cash to 14.4%.', regime: 'AI Supercycle' },
  { date: '2024-08-01', version: 'v2.1.0', action: 'Added PLTR after AIP inflection. Increased NVDA to 9.2%.', regime: 'AI Supercycle' },
  { date: '2024-03-15', version: 'v2.0.0', action: 'Initiated LLY position on GLP-1 momentum. TSM added for AI chip supply chain.', regime: 'Late Cycle' },
  { date: '2023-11-01', version: 'v1.5.0', action: 'Reduced cash from 18% to 14% on Fed pivot signal. Added META post-efficiency era.', regime: 'Transition' },
  { date: '2023-05-01', version: 'v1.2.0', action: 'Raised cash to 18% (SGOV/MINT) on banking stress. Trimmed JPM.', regime: 'Risk-Off' },
];
