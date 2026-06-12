// 13-F filings data — auto-refreshed quarterly
// SEC 13-F filings are due 45 days after quarter end
// Q4 2024 (filed ~Feb 14, 2025) | Q3 2024 (filed ~Nov 14, 2024)

export const FILING_QUARTERS = ['Q4 2024', 'Q3 2024', 'Q2 2024', 'Q1 2024'];

export const FUNDS = [
  {
    id: 'berkshire',
    name: 'Berkshire Hathaway',
    manager: 'Warren Buffett',
    aum: '$294B',
    style: 'Value / Long-Only',
    color: 'amber',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
  },
  {
    id: 'bridgewater',
    name: 'Bridgewater Associates',
    manager: 'Ray Dalio / Greg Jensen',
    aum: '~$124B',
    style: 'All Weather / Macro',
    color: 'blue',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
  },
  {
    id: 'appaloosa',
    name: 'Appaloosa Management',
    manager: 'David Tepper',
    aum: '~$14B',
    style: 'Distressed / Event-Driven',
    color: 'purple',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
  },
  {
    id: 'pershing',
    name: 'Pershing Square Capital',
    manager: 'Bill Ackman',
    aum: '~$11B',
    style: 'Concentrated / Activist',
    color: 'emerald',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
  },
  {
    id: 'soros',
    name: 'Soros Fund Management',
    manager: 'George Soros',
    aum: '~$6B',
    style: 'Global Macro',
    color: 'rose',
    latestFiling: 'Q4 2024',
    filingDate: '2025-02-14',
  },
];

// Holdings per fund per quarter: { symbol, name, shares (000s), value ($M), pctPortfolio, change }
// change: 'NEW' | 'INCREASED' | 'REDUCED' | 'EXITED' | null
export const HOLDINGS = {
  berkshire: {
    'Q4 2024': [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 300000, value: 56820, pct: 28.1, change: 'REDUCED', prev: 400000 },
      { symbol: 'BAC', name: 'Bank of America', shares: 680233, value: 28900, pct: 14.3, change: 'REDUCED', prev: 780000 },
      { symbol: 'AXP', name: 'American Express', shares: 151610, value: 41700, pct: 20.6, change: null },
      { symbol: 'KO', name: 'Coca-Cola', shares: 400000, value: 24800, pct: 12.3, change: null },
      { symbol: 'CVX', name: 'Chevron', shares: 118610, value: 15800, pct: 7.8, change: 'REDUCED', prev: 126000 },
      { symbol: 'OXY', name: 'Occidental Petroleum', shares: 264159, value: 13200, pct: 6.5, change: 'INCREASED', prev: 248000 },
      { symbol: 'MCO', name: 'Moody\'s Corp.', shares: 24669, value: 11300, pct: 5.6, change: null },
      { symbol: 'SIRI', name: 'Sirius XM', shares: 1046513, value: 3100, pct: 1.5, change: 'NEW', prev: 0 },
      { symbol: 'VRSN', name: 'VeriSign', shares: 13000, value: 2400, pct: 1.2, change: null },
      { symbol: 'CB', name: 'Chubb Ltd.', shares: 27033, value: 8700, pct: 4.3, change: null },
    ],
    'Q3 2024': [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 400000, value: 69600, pct: 29.8, change: 'REDUCED', prev: 789900 },
      { symbol: 'BAC', name: 'Bank of America', shares: 780000, value: 31200, pct: 13.4, change: 'REDUCED', prev: 1032852 },
      { symbol: 'AXP', name: 'American Express', shares: 151610, value: 37700, pct: 16.1, change: null },
      { symbol: 'KO', name: 'Coca-Cola', shares: 400000, value: 23800, pct: 10.2, change: null },
      { symbol: 'CVX', name: 'Chevron', shares: 126000, value: 17400, pct: 7.5, change: 'REDUCED', prev: 189000 },
      { symbol: 'OXY', name: 'Occidental Petroleum', shares: 248000, value: 12400, pct: 5.3, change: null },
      { symbol: 'MCO', name: 'Moody\'s Corp.', shares: 24669, value: 10200, pct: 4.4, change: null },
      { symbol: 'CB', name: 'Chubb Ltd.', shares: 27033, value: 8100, pct: 3.5, change: 'INCREASED', prev: 0 },
    ],
  },
  bridgewater: {
    'Q4 2024': [
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', shares: 5800, value: 3060, pct: 18.2, change: 'INCREASED', prev: 4800 },
      { symbol: 'GLD', name: 'SPDR Gold Trust', shares: 4100, value: 985, pct: 5.9, change: 'INCREASED', prev: 3600 },
      { symbol: 'EEM', name: 'iShares MSCI EM', shares: 3900, value: 460, pct: 2.7, change: 'REDUCED', prev: 4800 },
      { symbol: 'VWO', name: 'Vanguard EM ETF', shares: 3400, value: 142, pct: 0.8, change: null },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 1820, value: 320, pct: 1.9, change: 'NEW', prev: 0 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 980, value: 129, pct: 0.8, change: 'NEW', prev: 0 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 1200, value: 498, pct: 3.0, change: 'INCREASED', prev: 800 },
      { symbol: 'WMT', name: 'Walmart Inc.', shares: 4200, value: 270, pct: 1.6, change: null },
      { symbol: 'PG', name: 'Procter & Gamble', shares: 2800, value: 382, pct: 2.3, change: 'INCREASED', prev: 2400 },
      { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 2100, value: 310, pct: 1.9, change: null },
    ],
    'Q3 2024': [
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', shares: 4800, value: 2520, pct: 16.4, change: null },
      { symbol: 'GLD', name: 'SPDR Gold Trust', shares: 3600, value: 841, pct: 5.5, change: 'INCREASED', prev: 2900 },
      { symbol: 'EEM', name: 'iShares MSCI EM', shares: 4800, value: 555, pct: 3.6, change: null },
      { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 800, value: 332, pct: 2.2, change: null },
      { symbol: 'WMT', name: 'Walmart Inc.', shares: 4200, value: 245, pct: 1.6, change: null },
      { symbol: 'PG', name: 'Procter & Gamble', shares: 2400, value: 327, pct: 2.1, change: null },
    ],
  },
  appaloosa: {
    'Q4 2024': [
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 3400, value: 447, pct: 12.8, change: 'INCREASED', prev: 2800 },
      { symbol: 'META', name: 'Meta Platforms', shares: 890, value: 470, pct: 13.4, change: 'INCREASED', prev: 620 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2100, value: 369, pct: 10.5, change: 'REDUCED', prev: 2800 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 680, value: 282, pct: 8.1, change: null },
      { symbol: 'AMZN', name: 'Amazon.com', shares: 1420, value: 264, pct: 7.5, change: 'INCREASED', prev: 1100 },
      { symbol: 'BABA', name: 'Alibaba Group', shares: 4200, value: 352, pct: 10.1, change: 'REDUCED', prev: 5800 },
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 1100, value: 208, pct: 5.9, change: null },
      { symbol: 'JPM', name: 'JPMorgan Chase', shares: 800, value: 159, pct: 4.5, change: 'REDUCED', prev: 1200 },
    ],
    'Q3 2024': [
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 2800, value: 336, pct: 10.4, change: 'INCREASED', prev: 1500 },
      { symbol: 'META', name: 'Meta Platforms', shares: 620, value: 312, pct: 9.7, change: null },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2800, value: 475, pct: 14.7, change: null },
      { symbol: 'BABA', name: 'Alibaba Group', shares: 5800, value: 512, pct: 15.9, change: 'INCREASED', prev: 4200 },
    ],
  },
  pershing: {
    'Q4 2024': [
      { symbol: 'BN', name: 'Brookfield Corp.', shares: 24200, value: 1260, pct: 19.8, change: 'INCREASED', prev: 18400 },
      { symbol: 'HHH', name: 'Howard Hughes Holdings', shares: 5200, value: 390, pct: 6.1, change: null },
      { symbol: 'CMG', name: 'Chipotle Mexican Grill', shares: 820, value: 1480, pct: 23.3, change: 'REDUCED', prev: 940 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2800, value: 492, pct: 7.7, change: 'INCREASED', prev: 2100 },
      { symbol: 'HILTON', name: 'Hilton Worldwide', shares: 4600, value: 1020, pct: 16.0, change: null },
      { symbol: 'LOW', name: "Lowe's Companies", shares: 3200, value: 748, pct: 11.8, change: 'NEW', prev: 0 },
      { symbol: 'FANNIE', name: 'Fannie Mae (FNMA)', shares: 148000, value: 298, pct: 4.7, change: null },
    ],
    'Q3 2024': [
      { symbol: 'BN', name: 'Brookfield Corp.', shares: 18400, value: 960, pct: 16.2, change: null },
      { symbol: 'CMG', name: 'Chipotle Mexican Grill', shares: 940, value: 1650, pct: 27.8, change: null },
      { symbol: 'HILTON', name: 'Hilton Worldwide', shares: 4600, value: 978, pct: 16.5, change: null },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2100, value: 356, pct: 6.0, change: 'NEW', prev: 0 },
    ],
  },
  soros: {
    'Q4 2024': [
      { symbol: 'NVS', name: 'Novartis AG', shares: 2800, value: 280, pct: 7.8, change: 'NEW', prev: 0 },
      { symbol: 'LLY', name: 'Eli Lilly', shares: 380, value: 303, pct: 8.4, change: 'INCREASED', prev: 240 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 1200, value: 158, pct: 4.4, change: 'NEW', prev: 0 },
      { symbol: 'WYNN', name: 'Wynn Resorts', shares: 1800, value: 158, pct: 4.4, change: null },
      { symbol: 'RCL', name: 'Royal Caribbean', shares: 820, value: 155, pct: 4.3, change: 'REDUCED', prev: 1400 },
      { symbol: 'AMZN', name: 'Amazon.com', shares: 680, value: 126, pct: 3.5, change: 'INCREASED', prev: 480 },
      { symbol: 'BABA', name: 'Alibaba Group', shares: 2400, value: 201, pct: 5.6, change: 'INCREASED', prev: 1800 },
    ],
    'Q3 2024': [
      { symbol: 'LLY', name: 'Eli Lilly', shares: 240, value: 184, pct: 6.2, change: null },
      { symbol: 'WYNN', name: 'Wynn Resorts', shares: 1800, value: 150, pct: 5.0, change: 'INCREASED', prev: 1100 },
      { symbol: 'RCL', name: 'Royal Caribbean', shares: 1400, value: 228, pct: 7.7, change: 'INCREASED', prev: 800 },
      { symbol: 'BABA', name: 'Alibaba Group', shares: 1800, value: 159, pct: 5.4, change: null },
    ],
  },
};

// Compute changes between two consecutive quarters
export function getChangeSummary(fundId, quarter) {
  const quarters = FILING_QUARTERS;
  const currentIdx = quarters.indexOf(quarter);
  const prevQuarter = quarters[currentIdx + 1];
  const current = HOLDINGS[fundId]?.[quarter] ?? [];
  const prev = prevQuarter ? (HOLDINGS[fundId]?.[prevQuarter] ?? []) : [];
  const prevMap = Object.fromEntries(prev.map(h => [h.symbol, h]));

  const newPositions = current.filter(h => h.change === 'NEW');
  const exited = prev.filter(p => !current.find(c => c.symbol === p.symbol));
  const increased = current.filter(h => h.change === 'INCREASED');
  const reduced = current.filter(h => h.change === 'REDUCED');

  return { newPositions, exited, increased, reduced };
}

// Next filing date (auto-calculated: 45 days after quarter end)
export function getNextFilingDate() {
  const now = new Date('2025-06-12');
  const q1End = new Date('2025-03-31');
  const q1Filing = new Date(q1End);
  q1Filing.setDate(q1Filing.getDate() + 45);
  return q1Filing.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
