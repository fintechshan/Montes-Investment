export const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.23, changePct: 0.65 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.32, change: 3.87, changePct: 0.94 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.98, change: -0.54, changePct: -0.31 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 198.11, change: 2.14, changePct: 1.09 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.40, change: 18.25, changePct: 2.13 },
  { symbol: 'META', name: 'Meta Platforms', price: 524.67, change: -4.32, changePct: -0.82 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 241.35, change: -6.78, changePct: -2.73 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 402.18, change: 0.87, changePct: 0.22 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 218.54, change: 1.45, changePct: 0.67 },
  { symbol: 'V', name: 'Visa Inc.', price: 279.33, change: 0.92, changePct: 0.33 },
]

export function generateHistory(basePrice, days = 30) {
  const data = []
  let price = basePrice * 0.85
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    price = price * (1 + (Math.random() - 0.47) * 0.025)
    data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: Math.round(price * 100) / 100 })
  }
  return data
}
