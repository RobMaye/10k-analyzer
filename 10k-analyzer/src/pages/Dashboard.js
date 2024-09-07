import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>
      <p className={styles.subtitle}>Hello, {user.email}!</p>
      <div className={styles.actionContainer}>
        <Link to="/analysis" className={styles.button}>Start New Analysis</Link>
      </div>
      <div className={styles.recentAnalyses}>
        <h2>Recent Analyses</h2>
        <p>You haven't performed any analyses yet. Start by analyzing a company!</p>
      </div>
    </div>
  );
}

export default Dashboard;