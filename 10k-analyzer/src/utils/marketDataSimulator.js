// src/utils/marketDataSimulator.js

const initialStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'FB', name: 'Facebook, Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  ];
  
  const generateRandomChange = () => {
    return (Math.random() - 0.5) * 5; // Random change between -2.5% and 2.5%
  };
  
  export const generateMarketData = () => {
    return initialStocks.map(stock => {
      const change = generateRandomChange();
      const price = Math.max(50 + Math.random() * 450 + change, 0.01); // Ensure price is always positive
      return {
        ...stock,
        price: parseFloat(price.toFixed(2)),
        change: parseFloat(change.toFixed(2))
      };
    });
  };