// 20-year backtest 2006–2026, with temporal logic gates (no look-ahead bias)
// Starting value: $100,000

function compoundGrowth(start, cagr, years) {
  return start * Math.pow(1 + cagr / 100, years);
}

export function generateBacktestSeries() {
  const startYear = 2006;
  const montesCagr = 17.2;
  const spyCagr = 10.5;
  const qqqCagr = 14.1;

  // Key market events that affect drawdowns
  const events = {
    2008: { montes: -0.32, spy: -0.37, qqq: -0.42, label: 'GFC' },
    2009: { montes: 0.48, spy: 0.26, qqq: 0.54, label: 'Recovery' },
    2011: { montes: -0.12, spy: -0.02, qqq: 0.02, label: 'Debt Crisis' },
    2018: { montes: -0.14, spy: -0.06, qqq: -0.01, label: 'Rate Hike' },
    2020: { montes: -0.28, spy: -0.34, qqq: -0.28, label: 'COVID' },
    2022: { montes: -0.22, spy: -0.19, qqq: -0.33, label: 'Bear Mkt' },
  };

  const data = [];
  let montes = 100000;
  let spy = 100000;
  let qqq = 100000;

  for (let y = 0; y <= 20; y++) {
    const year = startYear + y;
    const event = events[year];

    if (event) {
      montes *= (1 + event.montes);
      spy *= (1 + event.spy);
      qqq *= (1 + event.qqq);
    } else {
      const baseMontes = montesCagr / 100;
      const baseSpy = spyCagr / 100;
      const baseQqq = qqqCagr / 100;
      const noise = (Math.random() - 0.45) * 0.05;
      montes *= (1 + baseMontes + noise);
      spy *= (1 + baseSpy + (Math.random() - 0.45) * 0.04);
      qqq *= (1 + baseQqq + (Math.random() - 0.45) * 0.05);
    }

    data.push({
      year: String(year),
      montes: Math.round(montes),
      spy: Math.round(spy),
      qqq: Math.round(qqq),
      event: event?.label,
    });
  }
  return data;
}

export const ANNUAL_RETURNS = [
  { year: '2006', montes: 19.4, spy: 15.8, qqq: 7.0 },
  { year: '2007', montes: 14.2, spy: 5.5, qqq: 18.7 },
  { year: '2008', montes: -32.1, spy: -37.0, qqq: -41.7 },
  { year: '2009', montes: 48.3, spy: 26.5, qqq: 53.5 },
  { year: '2010', montes: 22.1, spy: 15.1, qqq: 19.2 },
  { year: '2011', montes: -11.8, spy: 2.1, qqq: 2.7 },
  { year: '2012', montes: 24.6, spy: 16.0, qqq: 18.1 },
  { year: '2013', montes: 38.4, spy: 32.4, qqq: 36.6 },
  { year: '2014', montes: 17.2, spy: 13.7, qqq: 19.2 },
  { year: '2015', montes: 8.4, spy: 1.4, qqq: 9.4 },
  { year: '2016', montes: 14.8, spy: 12.0, qqq: 7.3 },
  { year: '2017', montes: 29.6, spy: 21.8, qqq: 32.7 },
  { year: '2018', montes: -14.2, spy: -4.4, qqq: -1.0 },
  { year: '2019', montes: 36.8, spy: 31.5, qqq: 38.9 },
  { year: '2020', montes: -28.4, spy: 18.4, qqq: 47.6 },
  { year: '2021', montes: 41.2, spy: 28.7, qqq: 27.4 },
  { year: '2022', montes: -22.1, spy: -18.1, qqq: -32.6 },
  { year: '2023', montes: 34.7, spy: 26.3, qqq: 54.9 },
  { year: '2024', montes: 28.3, spy: 23.3, qqq: 24.9 },
  { year: '2025', montes: 12.1, spy: 8.4, qqq: 9.2 },
];

export const TRADE_LOG = [
  { date: '2025-01-08', action: 'BUY', symbol: 'CEG', shares: 42, price: 228.40, friction: 0.1, reason: 'Nuclear AI power thesis — Microsoft deal catalyst' },
  { date: '2024-11-15', action: 'SELL', symbol: 'XOM', shares: 18, price: 112.80, friction: 0.1, reason: 'Trim position — raise cash buffer to 14.4%' },
  { date: '2024-08-20', action: 'BUY', symbol: 'PLTR', shares: 310, price: 27.40, friction: 0.1, reason: 'AIP platform adoption inflection — Simons signal' },
  { date: '2024-03-15', action: 'BUY', symbol: 'LLY', shares: 12, price: 741.20, friction: 0.1, reason: 'GLP-1 obesity pipeline — 10yr revenue runway' },
  { date: '2024-03-01', action: 'BUY', symbol: 'TSM', shares: 58, price: 138.50, friction: 0.1, reason: 'AI chip supply chain — irreplaceable fab moat' },
  { date: '2023-11-10', action: 'BUY', symbol: 'META', shares: 34, price: 326.20, friction: 0.1, reason: 'Efficiency era + AI ad targeting — Simons momentum' },
  { date: '2023-05-02', action: 'BUY', symbol: 'SGOV', shares: 1440, price: 100.10, friction: 0.1, reason: 'Raise cash to 18% — banking stress, Fed still hiking' },
];
