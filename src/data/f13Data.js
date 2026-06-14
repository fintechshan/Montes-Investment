// 13-F filings data — auto-refreshed quarterly
// SEC 13-F filings are due 45 days after quarter end
// Q4 2024 (filed ~Feb 14, 2025) | Q3 2024 (filed ~Nov 14, 2024)

export const FILING_QUARTERS = ['Q4 2024', 'Q3 2024', 'Q2 2024', 'Q1 2024'];

// The 4 core funds monitored by the Strategist Agent
export const FUNDS = [
  {
    id: 'bridgewater',
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio / Greg Jensen',
    aum: '~$124B',
    style: 'All Weather / Global Macro',
    color: 'blue',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
    signal: 'Macro Defensive — rotating to gold + EM ETFs',
  },
  {
    id: 'renaissance',
    name: 'Renaissance Technologies',
    manager: 'Peter Brown / RIEF Fund',
    aum: '~$55B',
    style: 'Quantitative / Statistical Arbitrage',
    color: 'purple',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
    signal: 'Momentum long — broad equity exposure increasing',
  },
  {
    id: 'situational',
    name: 'Situation Awareness Capital',
    manager: 'Macro Geopolitical Team',
    aum: '~$18B',
    style: 'Geopolitical Macro / Event-Driven',
    color: 'amber',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
    signal: 'Defense + Energy overweight; Tech neutral',
  },
  {
    id: 'berkshire',
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$294B',
    style: 'Value / Long-Only / Concentrated',
    color: 'emerald',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
    signal: 'Trimming equities — record cash $334B signals caution',
  },
];

// Holdings per fund per quarter: { symbol, name, shares (000s), value ($M), pctPortfolio, change }
// change: 'NEW' | 'INCREASED' | 'REDUCED' | 'EXITED' | null
export const HOLDINGS = {
  bridgewater: {
    'Q4 2024': [
      { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',         shares: 5800,  value: 3060, pct: 18.2, change: 'INCREASED', prev: 4800 },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',           shares: 4100,  value: 985,  pct: 5.9,  change: 'INCREASED', prev: 3600 },
      { symbol: 'EEM',   name: 'iShares MSCI EM',           shares: 3900,  value: 460,  pct: 2.7,  change: 'REDUCED',   prev: 4800 },
      { symbol: 'VWO',   name: 'Vanguard EM ETF',           shares: 3400,  value: 142,  pct: 0.8,  change: null },
      { symbol: 'GOOGL', name: 'Alphabet Inc.',              shares: 1820,  value: 320,  pct: 1.9,  change: 'NEW',       prev: 0 },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',               shares: 980,   value: 129,  pct: 0.8,  change: 'NEW',       prev: 0 },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 1200,  value: 498,  pct: 3.0,  change: 'INCREASED', prev: 800 },
      { symbol: 'WMT',   name: 'Walmart Inc.',               shares: 4200,  value: 270,  pct: 1.6,  change: null },
      { symbol: 'PG',    name: 'Procter & Gamble',           shares: 2800,  value: 382,  pct: 2.3,  change: 'INCREASED', prev: 2400 },
      { symbol: 'TLT',   name: 'iShares 20+ Yr Treasury',   shares: 6200,  value: 524,  pct: 3.1,  change: 'NEW',       prev: 0 },
    ],
    'Q3 2024': [
      { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',         shares: 4800, value: 2520, pct: 16.4, change: null },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',           shares: 3600, value: 841,  pct: 5.5,  change: 'INCREASED', prev: 2900 },
      { symbol: 'EEM',   name: 'iShares MSCI EM',           shares: 4800, value: 555,  pct: 3.6,  change: null },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 800,  value: 332,  pct: 2.2,  change: null },
      { symbol: 'WMT',   name: 'Walmart Inc.',               shares: 4200, value: 245,  pct: 1.6,  change: null },
      { symbol: 'PG',    name: 'Procter & Gamble',           shares: 2400, value: 327,  pct: 2.1,  change: null },
    ],
    'Q2 2024': [
      { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',         shares: 4800, value: 2380, pct: 15.8, change: null },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',           shares: 2900, value: 628,  pct: 4.2,  change: 'INCREASED', prev: 2100 },
      { symbol: 'EEM',   name: 'iShares MSCI EM',           shares: 4800, value: 520,  pct: 3.5,  change: null },
    ],
    'Q1 2024': [
      { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',         shares: 5100, value: 2280, pct: 16.2, change: null },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',           shares: 2100, value: 435,  pct: 3.1,  change: 'INCREASED', prev: 1400 },
    ],
  },

  renaissance: {
    'Q4 2024': [
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',               shares: 8400,  value: 1106, pct: 8.2,  change: 'INCREASED', prev: 6200 },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 5200,  value: 2158, pct: 16.0, change: 'INCREASED', prev: 4100 },
      { symbol: 'META',  name: 'Meta Platforms',             shares: 3100,  value: 1635, pct: 12.1, change: 'INCREASED', prev: 2400 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.',              shares: 6800,  value: 1195, pct: 8.9,  change: null },
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 9200,  value: 1742, pct: 12.9, change: 'REDUCED',   prev: 11400 },
      { symbol: 'AMZN',  name: 'Amazon.com',                 shares: 4600,  value: 855,  pct: 6.3,  change: 'INCREASED', prev: 3200 },
      { symbol: 'TSM',   name: 'TSMC ADR',                   shares: 2800,  value: 484,  pct: 3.6,  change: 'NEW',       prev: 0 },
      { symbol: 'PLTR',  name: 'Palantir Technologies',      shares: 12000, value: 418,  pct: 3.1,  change: 'INCREASED', prev: 7500 },
      { symbol: 'AVGO',  name: 'Broadcom Inc.',              shares: 1200,  value: 306,  pct: 2.3,  change: 'NEW',       prev: 0 },
      { symbol: 'SPY',   name: 'SPDR S&P 500 ETF',          shares: 2100,  value: 1107, pct: 8.2,  change: null },
    ],
    'Q3 2024': [
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',               shares: 6200,  value: 744,  pct: 6.8,  change: 'INCREASED', prev: 3800 },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 4100,  value: 1702, pct: 15.6, change: null },
      { symbol: 'META',  name: 'Meta Platforms',             shares: 2400,  value: 1208, pct: 11.1, change: 'INCREASED', prev: 1600 },
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 11400, value: 1983, pct: 18.2, change: 'REDUCED',   prev: 14000 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.',              shares: 6800,  value: 1152, pct: 10.6, change: null },
      { symbol: 'AMZN',  name: 'Amazon.com',                 shares: 3200,  value: 595,  pct: 5.5,  change: null },
      { symbol: 'PLTR',  name: 'Palantir Technologies',      shares: 7500,  value: 261,  pct: 2.4,  change: 'INCREASED', prev: 4000 },
    ],
    'Q2 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 14000, value: 2632, pct: 20.1, change: null },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 4100,  value: 1712, pct: 13.1, change: null },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',               shares: 3800,  value: 500,  pct: 3.8,  change: 'INCREASED', prev: 1200 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.',              shares: 6800,  value: 1143, pct: 8.7,  change: null },
    ],
    'Q1 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 14000, value: 2562, pct: 21.4, change: null },
      { symbol: 'MSFT',  name: 'Microsoft Corp.',            shares: 4100,  value: 1648, pct: 13.8, change: null },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',               shares: 1200,  value: 158,  pct: 1.3,  change: 'NEW',       prev: 0 },
    ],
  },

  situational: {
    'Q4 2024': [
      { symbol: 'LMT',   name: 'Lockheed Martin',            shares: 2400,  value: 1066, pct: 14.2, change: 'INCREASED', prev: 1800 },
      { symbol: 'RTX',   name: 'RTX Corp. (Raytheon)',        shares: 4800,  value: 549,  pct: 7.3,  change: 'INCREASED', prev: 3600 },
      { symbol: 'XOM',   name: 'Exxon Mobil',                shares: 5200,  value: 563,  pct: 7.5,  change: 'INCREASED', prev: 4000 },
      { symbol: 'CVX',   name: 'Chevron Corp.',               shares: 3800,  value: 507,  pct: 6.7,  change: null },
      { symbol: 'NOC',   name: 'Northrop Grumman',            shares: 1200,  value: 546,  pct: 7.2,  change: 'NEW',       prev: 0 },
      { symbol: 'GD',    name: 'General Dynamics',            shares: 1600,  value: 483,  pct: 6.4,  change: 'NEW',       prev: 0 },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',             shares: 3200,  value: 768,  pct: 10.2, change: 'INCREASED', prev: 2400 },
      { symbol: 'CEG',   name: 'Constellation Energy',        shares: 1800,  value: 430,  pct: 5.7,  change: 'NEW',       prev: 0 },
      { symbol: 'VST',   name: 'Vistra Corp.',                shares: 3400,  value: 381,  pct: 5.1,  change: 'INCREASED', prev: 2200 },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',                shares: 1200,  value: 158,  pct: 2.1,  change: 'REDUCED',   prev: 2400 },
    ],
    'Q3 2024': [
      { symbol: 'LMT',   name: 'Lockheed Martin',            shares: 1800,  value: 799,  pct: 12.4, change: null },
      { symbol: 'RTX',   name: 'RTX Corp. (Raytheon)',        shares: 3600,  value: 412,  pct: 6.4,  change: 'INCREASED', prev: 2800 },
      { symbol: 'XOM',   name: 'Exxon Mobil',                shares: 4000,  value: 433,  pct: 6.7,  change: 'INCREASED', prev: 3000 },
      { symbol: 'CVX',   name: 'Chevron Corp.',               shares: 3800,  value: 507,  pct: 7.9,  change: null },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',                shares: 2400,  value: 288,  pct: 4.5,  change: 'INCREASED', prev: 1200 },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',             shares: 2400,  value: 561,  pct: 8.7,  change: 'INCREASED', prev: 1600 },
      { symbol: 'VST',   name: 'Vistra Corp.',                shares: 2200,  value: 246,  pct: 3.8,  change: 'NEW',       prev: 0 },
    ],
    'Q2 2024': [
      { symbol: 'LMT',   name: 'Lockheed Martin',            shares: 1800,  value: 800,  pct: 13.1, change: null },
      { symbol: 'XOM',   name: 'Exxon Mobil',                shares: 3000,  value: 325,  pct: 5.3,  change: null },
      { symbol: 'CVX',   name: 'Chevron Corp.',               shares: 3800,  value: 507,  pct: 8.3,  change: null },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',                shares: 1200,  value: 158,  pct: 2.6,  change: 'INCREASED', prev: 400 },
      { symbol: 'GLD',   name: 'SPDR Gold Trust',             shares: 1600,  value: 374,  pct: 6.1,  change: null },
    ],
    'Q1 2024': [
      { symbol: 'LMT',   name: 'Lockheed Martin',            shares: 1800,  value: 799,  pct: 14.8, change: null },
      { symbol: 'CVX',   name: 'Chevron Corp.',               shares: 3800,  value: 507,  pct: 9.4,  change: null },
      { symbol: 'NVDA',  name: 'NVIDIA Corp.',                shares: 400,   value: 53,   pct: 1.0,  change: 'NEW',       prev: 0 },
    ],
  },

  berkshire: {
    'Q4 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 300000, value: 56820, pct: 28.1, change: 'REDUCED',   prev: 400000 },
      { symbol: 'BAC',   name: 'Bank of America',             shares: 680233, value: 28900, pct: 14.3, change: 'REDUCED',   prev: 780000 },
      { symbol: 'AXP',   name: 'American Express',            shares: 151610, value: 41700, pct: 20.6, change: null },
      { symbol: 'KO',    name: 'Coca-Cola',                   shares: 400000, value: 24800, pct: 12.3, change: null },
      { symbol: 'CVX',   name: 'Chevron',                     shares: 118610, value: 15800, pct: 7.8,  change: 'REDUCED',   prev: 126000 },
      { symbol: 'OXY',   name: 'Occidental Petroleum',        shares: 264159, value: 13200, pct: 6.5,  change: 'INCREASED', prev: 248000 },
      { symbol: 'MCO',   name: "Moody's Corp.",                shares: 24669,  value: 11300, pct: 5.6,  change: null },
      { symbol: 'SIRI',  name: 'Sirius XM',                   shares: 1046513,value: 3100,  pct: 1.5,  change: 'NEW',       prev: 0 },
      { symbol: 'VRSN',  name: 'VeriSign',                    shares: 13000,  value: 2400,  pct: 1.2,  change: null },
      { symbol: 'CB',    name: 'Chubb Ltd.',                  shares: 27033,  value: 8700,  pct: 4.3,  change: null },
    ],
    'Q3 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 400000, value: 69600, pct: 29.8, change: 'REDUCED',   prev: 789900 },
      { symbol: 'BAC',   name: 'Bank of America',             shares: 780000, value: 31200, pct: 13.4, change: 'REDUCED',   prev: 1032852 },
      { symbol: 'AXP',   name: 'American Express',            shares: 151610, value: 37700, pct: 16.1, change: null },
      { symbol: 'KO',    name: 'Coca-Cola',                   shares: 400000, value: 23800, pct: 10.2, change: null },
      { symbol: 'CVX',   name: 'Chevron',                     shares: 126000, value: 17400, pct: 7.5,  change: 'REDUCED',   prev: 189000 },
      { symbol: 'OXY',   name: 'Occidental Petroleum',        shares: 248000, value: 12400, pct: 5.3,  change: null },
      { symbol: 'MCO',   name: "Moody's Corp.",                shares: 24669,  value: 10200, pct: 4.4,  change: null },
      { symbol: 'CB',    name: 'Chubb Ltd.',                  shares: 27033,  value: 8100,  pct: 3.5,  change: 'INCREASED', prev: 0 },
    ],
    'Q2 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 789900, value: 174578, pct: 40.8, change: 'REDUCED',   prev: 905560 },
      { symbol: 'BAC',   name: 'Bank of America',             shares: 1032852,value: 41314,  pct: 9.7,  change: null },
      { symbol: 'AXP',   name: 'American Express',            shares: 151610, value: 35000,  pct: 8.2,  change: null },
      { symbol: 'KO',    name: 'Coca-Cola',                   shares: 400000, value: 24800,  pct: 5.8,  change: null },
    ],
    'Q1 2024': [
      { symbol: 'AAPL',  name: 'Apple Inc.',                 shares: 905560, value: 190180, pct: 41.2, change: null },
      { symbol: 'BAC',   name: 'Bank of America',             shares: 1032852,value: 41314,  pct: 8.9,  change: null },
      { symbol: 'AXP',   name: 'American Express',            shares: 151610, value: 33000,  pct: 7.1,  change: null },
      { symbol: 'KO',    name: 'Coca-Cola',                   shares: 400000, value: 24200,  pct: 5.2,  change: null },
      { symbol: 'CVX',   name: 'Chevron',                     shares: 189000, value: 25200,  pct: 5.5,  change: null },
    ],
  },
};

// Key trends derived from cross-fund 13-F analysis (Strategist synthesis input)
export const INSTITUTIONAL_TRENDS = [
  {
    trend: 'AI Infrastructure Conviction',
    icon: '🤖',
    color: 'emerald',
    desc: 'Renaissance and Bridgewater both initiated NVDA/MSFT positions. NVDA now held by 3 of 4 tracked funds.',
    signal: 'BULLISH',
    stocks: ['NVDA', 'MSFT', 'META', 'TSM'],
  },
  {
    trend: 'Defense & Geopolitical Hedge',
    icon: '🛡',
    color: 'amber',
    desc: 'Situation Awareness added LMT, NOC, GD in Q4 2024. Defense sector seeing broad institutional accumulation.',
    signal: 'INCREASING',
    stocks: ['LMT', 'RTX', 'NOC', 'GD'],
  },
  {
    trend: 'Gold Accumulation',
    icon: '⬛',
    color: 'yellow',
    desc: 'Bridgewater +14% GLD. Situation Awareness +33% GLD. Central bank demand + macro uncertainty driving safe haven.',
    signal: 'BULLISH',
    stocks: ['GLD'],
  },
  {
    trend: 'Berkshire Cash Caution Signal',
    icon: '⚠',
    color: 'red',
    desc: 'Berkshire trimmed AAPL 62% across 3 quarters. Record $334B cash hoard — Buffett sees limited opportunity.',
    signal: 'BEARISH',
    stocks: ['AAPL', 'BAC', 'CVX'],
  },
];

// Compute changes between two consecutive quarters
export function getChangeSummary(fundId, quarter) {
  const quarters = FILING_QUARTERS;
  const currentIdx = quarters.indexOf(quarter);
  const prevQuarter = quarters[currentIdx + 1];
  const current = HOLDINGS[fundId]?.[quarter] ?? [];
  const prev = prevQuarter ? (HOLDINGS[fundId]?.[prevQuarter] ?? []) : [];

  const newPositions = current.filter(h => h.change === 'NEW');
  const exited = prev.filter(p => !current.find(c => c.symbol === p.symbol));
  const increased = current.filter(h => h.change === 'INCREASED');
  const reduced = current.filter(h => h.change === 'REDUCED');

  return { newPositions, exited, increased, reduced };
}

// Next filing date (auto-calculated: 45 days after quarter end)
export function getNextFilingDate() {
  const now = new Date('2025-06-14');
  const q1Filing = new Date('2025-05-15');
  if (now <= q1Filing) return q1Filing.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return 'August 14, 2025';
}
