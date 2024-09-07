import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Results.module.css';

function Results({ data }) {
  const chartData = [
    { name: 'Revenue Growth', value: data.revenueGrowth },
    { name: 'Profit Margin', value: data.profitMargin },
    { name: 'Debt to Equity', value: data.debtToEquity },
    { name: 'Current Ratio', value: data.currentRatio },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Analysis Results for {data.companyName}</h2>
      <div className={styles.resultItem}>
        <strong>Financial Health:</strong> {data.financialHealth}
      </div>
      <div className={styles.resultItem}>
        <strong>Growth Prospects:</strong> {data.growthProspects}
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.resultItem}>
        <strong>Key Risks:</strong>
        <ul>
          {data.risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
      <div className={styles.recommendation}>
        <strong>Recommendation:</strong> {data.recommendation}
      </div>
    </div>
  );
}

export default Results;