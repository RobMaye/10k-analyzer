import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Home.module.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to 10-K Analyzer</h1>
      <p className={styles.subtitle}>Harness the power of AI to analyze 10-K reports and get data-driven investment recommendations.</p>
      {user ? (
        <Link to="/dashboard" className={styles.button}>Go to Dashboard</Link>
      ) : (
        <Link to="/login" className={styles.button}>Get Started</Link>
      )}
    </div>
  );
}

export default Home;