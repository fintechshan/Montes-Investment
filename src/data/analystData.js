// Analyst research data — Goldman Sachs, Morgan Stanley, UBS, Bernstein
// Ratings: BUY | NEUTRAL | SELL | OVERWEIGHT | UNDERWEIGHT
// Updated Q4 2024 / Q1 2025 cycle

export const BANKS = [
  { id: 'gs', name: 'Goldman Sachs', short: 'GS', color: 'blue' },
  { id: 'ms', name: 'Morgan Stanley', short: 'MS', color: 'indigo' },
  { id: 'ubs', name: 'UBS', color: 'red' },
  { id: 'bernstein', name: 'Bernstein', short: 'BST', color: 'purple' },
];

// Per-stock analyst ratings with price targets and thesis summary
export const ANALYST_RATINGS = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    gs:         { rating: 'BUY',       target: 165, thesis: 'Blackwell GPU ramp; data center TAM $400B+' },
    ms:         { rating: 'OVERWEIGHT', target: 170, thesis: 'AI infrastructure super-cycle; NIM dominance' },
    ubs:        { rating: 'BUY',        target: 155, thesis: 'Supply chain normalizing; margins expanding' },
    bernstein:  { rating: 'OUTPERFORM', target: 160, thesis: 'CUDA moat: switching costs structurally high' },
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    gs:         { rating: 'BUY',       target: 475, thesis: 'Copilot monetization beginning; Azure share gains' },
    ms:         { rating: 'OVERWEIGHT', target: 480, thesis: 'Cloud+AI bundle best positioned in enterprise' },
    ubs:        { rating: 'NEUTRAL',    target: 430, thesis: 'Valuation fair; execution risk on AI ROI' },
    bernstein:  { rating: 'OUTPERFORM', target: 460, thesis: 'Office 365 + Azure flywheel compounding' },
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    gs:         { rating: 'NEUTRAL',   target: 200, thesis: 'AI hardware cycle optionality; China risk remains' },
    ms:         { rating: 'OVERWEIGHT', target: 220, thesis: 'iPhone 16 AI supercycle; services margin expansion' },
    ubs:        { rating: 'NEUTRAL',    target: 195, thesis: 'Premium hardware demand stable; AI unproven' },
    bernstein:  { rating: 'OUTPERFORM', target: 215, thesis: 'Installed base 2.2B devices — AI monetization lever' },
  },
  {
    symbol: 'META',
    name: 'Meta Platforms',
    gs:         { rating: 'BUY',       target: 620, thesis: 'Reels + Llama AI driving ad efficiency step-change' },
    ms:         { rating: 'OVERWEIGHT', target: 630, thesis: 'Ad market share gains; Reality Labs optionality' },
    ubs:        { rating: 'BUY',        target: 590, thesis: 'Open-source AI strategy lowers capex vs peers' },
    bernstein:  { rating: 'OUTPERFORM', target: 600, thesis: 'Best-in-class ad targeting; 3B+ daily users' },
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    gs:         { rating: 'BUY',       target: 210, thesis: 'Search durable; YouTube + Cloud re-accelerating' },
    ms:         { rating: 'OVERWEIGHT', target: 205, thesis: 'Gemini integration into Search changes monetization' },
    ubs:        { rating: 'BUY',        target: 195, thesis: 'Cloud growing 28%+ YoY; Search share stable' },
    bernstein:  { rating: 'OUTPERFORM', target: 200, thesis: 'Waymo + DeepMind optionality not priced in' },
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com',
    gs:         { rating: 'BUY',       target: 230, thesis: 'AWS margin expansion; Bedrock AI platform sticky' },
    ms:         { rating: 'OVERWEIGHT', target: 225, thesis: 'Retail profitability inflection + AWS compounding' },
    ubs:        { rating: 'BUY',        target: 215, thesis: 'Advertising segment now $50B+ and accelerating' },
    bernstein:  { rating: 'OUTPERFORM', target: 220, thesis: 'Prime ecosystem creates unparalleled data moat' },
  },
  {
    symbol: 'TSM',
    name: 'TSMC',
    gs:         { rating: 'BUY',       target: 210, thesis: 'N2 node ramp; CoWoS packaging monopoly' },
    ms:         { rating: 'OVERWEIGHT', target: 205, thesis: 'AI chip demand pulls forward capacity expansion' },
    ubs:        { rating: 'BUY',        target: 195, thesis: 'Arizona fabs reduce geopolitical risk premium' },
    bernstein:  { rating: 'OUTPERFORM', target: 200, thesis: 'Only foundry capable of 2nm — 5yr moat' },
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly',
    gs:         { rating: 'BUY',       target: 900, thesis: 'GLP-1 market $150B by 2030; Mounjaro dominant' },
    ms:         { rating: 'OVERWEIGHT', target: 950, thesis: 'Tirzepatide pipeline breadth beyond obesity' },
    ubs:        { rating: 'NEUTRAL',    target: 800, thesis: 'Supply constraints limit near-term upside' },
    bernstein:  { rating: 'OUTPERFORM', target: 920, thesis: 'Orforglipron (oral GLP-1) is the next catalyst' },
  },
  {
    symbol: 'CEG',
    name: 'Constellation Energy',
    gs:         { rating: 'BUY',       target: 290, thesis: 'Nuclear PPA pipeline: Microsoft, Google deals locked' },
    ms:         { rating: 'OVERWEIGHT', target: 280, thesis: 'AI data center power demand secular tailwind' },
    ubs:        { rating: 'BUY',        target: 265, thesis: 'Zero-carbon baseload premium pricing expanding' },
    bernstein:  { rating: 'OUTPERFORM', target: 275, thesis: 'Crane nuclear restart adds 2.5GW by 2028' },
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase',
    gs:         { rating: 'NEUTRAL',   target: 210, thesis: 'Best-in-class management; rate normalization headwind' },
    ms:         { rating: 'OVERWEIGHT', target: 220, thesis: 'Net interest income durability underappreciated' },
    ubs:        { rating: 'NEUTRAL',    target: 205, thesis: 'Credit quality holding; capital return story intact' },
    bernstein:  { rating: 'MARKET PERFORM', target: 200, thesis: 'Fairly valued; Dimon succession watch' },
  },
];

// Strategist macro synthesis by bank (quarterly views)
export const MACRO_VIEWS = [
  {
    bank: 'Goldman Sachs',
    short: 'GS',
    color: 'blue',
    regime: 'Soft Landing',
    spxTarget: 5800,
    fedCuts: '2 cuts in 2025',
    topTheme: 'AI Capex Cycle + Productivity Gains',
    risk: 'Sticky services inflation delays cuts',
    conviction: 'BULLISH',
  },
  {
    bank: 'Morgan Stanley',
    short: 'MS',
    color: 'indigo',
    regime: 'Late Cycle Expansion',
    spxTarget: 5500,
    fedCuts: '1-2 cuts H2 2025',
    topTheme: 'Quality Factor Rotation + Defensive Growth',
    risk: 'Consumer credit deterioration',
    conviction: 'CAUTIOUSLY BULLISH',
  },
  {
    bank: 'UBS',
    short: 'UBS',
    color: 'red',
    regime: 'Slowdown Risk',
    spxTarget: 5200,
    fedCuts: '3 cuts 2025',
    topTheme: 'Mega-cap Tech + International Diversification',
    risk: 'Geopolitical tail risk; China slowdown',
    conviction: 'NEUTRAL',
  },
  {
    bank: 'Bernstein',
    short: 'BST',
    color: 'purple',
    regime: 'AI Supercycle',
    spxTarget: 6200,
    fedCuts: '1 cut 2025',
    topTheme: 'Compute Infrastructure + GLP-1 Biotech',
    risk: 'Concentration risk in Mag-7',
    conviction: 'BULLISH',
  },
];

// Consensus rating helper
export function getConsensus(ratings) {
  const score = { BUY: 2, OVERWEIGHT: 2, OUTPERFORM: 2, NEUTRAL: 1, 'MARKET PERFORM': 1, UNDERWEIGHT: 0, SELL: 0, UNDERPERFORM: 0 };
  const values = ['gs', 'ms', 'ubs', 'bernstein'].map(b => score[ratings[b]?.rating] ?? 1);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  if (avg >= 1.75) return { label: 'Strong Buy', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' };
  if (avg >= 1.25) return { label: 'Buy', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' };
  if (avg >= 0.75) return { label: 'Neutral', color: 'text-slate-400', bg: 'bg-slate-700 border-slate-600' };
  return { label: 'Sell', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' };
}
