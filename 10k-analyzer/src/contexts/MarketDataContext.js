import React, { createContext, useState, useEffect } from 'react';
import { generateMarketData } from '../utils/marketDataSimulator';

export const MarketDataContext = createContext();

export const MarketDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMarketData(generateMarketData());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MarketDataContext.Provider value={{ marketData }}>
      {children}
    </MarketDataContext.Provider>
  );
};