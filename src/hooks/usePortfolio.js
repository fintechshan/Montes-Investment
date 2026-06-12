import { useState, useEffect, useMemo } from 'react';
import { MOCK_HOLDINGS } from '../data/mockData';

const STORAGE_KEY = 'montes_holdings';

export default function usePortfolio() {
  const [holdings, setHoldings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : MOCK_HOLDINGS;
    } catch {
      return MOCK_HOLDINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  }, [holdings]);

  function addHolding(holding) {
    setHoldings(prev => [...prev, { ...holding, id: Date.now() }]);
  }

  function removeHolding(id) {
    setHoldings(prev => prev.filter(h => h.id !== id));
  }

  const stats = useMemo(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
    return { totalValue, totalCost, totalGainLoss, totalGainLossPercent };
  }, [holdings]);

  return { holdings, addHolding, removeHolding, ...stats };
}
