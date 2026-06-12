export const MOCK_HOLDINGS = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgCost: 150, currentPrice: 189.30 },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', shares: 5, avgCost: 280, currentPrice: 415.20 },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 3, avgCost: 120, currentPrice: 175.40 },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 8, avgCost: 130, currentPrice: 185.60 },
  { id: 5, symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, avgCost: 200, currentPrice: 248.50 },
  { id: 6, symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 20, avgCost: 400, currentPrice: 875.30 },
];

export const MOCK_MARKET_DATA = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 2.45, changePercent: 1.31, volume: '58.2M', marketCap: '2.94T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.20, change: -1.80, changePercent: -0.43, volume: '22.1M', marketCap: '3.08T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.40, change: 3.10, changePercent: 1.80, volume: '24.5M', marketCap: '2.18T' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 185.60, change: 1.25, changePercent: 0.68, volume: '35.7M', marketCap: '1.93T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -5.30, changePercent: -2.09, volume: '112.3M', marketCap: '793.2B' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.30, change: 22.40, changePercent: 2.63, volume: '48.9M', marketCap: '2.16T' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 527.60, change: 8.90, changePercent: 1.72, volume: '18.4M', marketCap: '1.35T' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 398.20, change: 0.60, changePercent: 0.15, volume: '4.2M', marketCap: '866.5B' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 147.80, change: -0.95, changePercent: -0.64, volume: '8.1M', marketCap: '356.2B' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.45, change: 3.20, changePercent: 1.64, volume: '11.8M', marketCap: '571.3B' },
];

export function generatePortfolioHistory() {
  const data = [];
  let value = 25000;
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    value = value + (Math.random() - 0.42) * 600;
    data.push({ date: `${month} ${day}`, value: Math.round(value) });
  }
  return data;
}

export const mockHoldings = MOCK_HOLDINGS;
export const mockMarketData = MOCK_MARKET_DATA;
