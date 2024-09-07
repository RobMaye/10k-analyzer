import React, { useState } from 'react';
import styles from './Analysis.module.css';
import Results from '../components/Results'; // We'll create this next

function Analysis() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results
      const mockResults = {
        companyName: ticker.toUpperCase(),
        financialHealth: 'Good',
        growthProspects: 'Moderate',
        revenueGrowth: 15,
        profitMargin: 8,
        debtToEquity: 1.2,
        currentRatio: 1.5,
        risks: ['Market volatility', 'Regulatory changes', 'Increasing competition'],
        recommendation: 'Hold'
      };
      
      setResults(mockResults);
    } catch (err) {
      setError('An error occurred while analyzing the 10-K. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analyze 10-K Report</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter company ticker"
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {results && <Results data={results} />}
    </div>
  );
}

export default Analysis;