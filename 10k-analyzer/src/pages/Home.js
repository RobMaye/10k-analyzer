import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import styles from './Home.module.css';

function Home() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.title} variants={itemVariants}>
        Welcome to 10-K Analyzer
      </motion.h1>
      <motion.p className={styles.subtitle} variants={itemVariants}>
        Harness the power of AI to analyze 10-K reports and get data-driven investment recommendations.
      </motion.p>
      <motion.div className={styles.features} variants={itemVariants}>
        <div className={styles.featureItem}>
          <BarChart2 size={48} />
          <h3>Advanced Analytics</h3>
          <p>Dive deep into financial data with our cutting-edge AI analysis.</p>
        </div>
        <div className={styles.featureItem}>
          <TrendingUp size={48} />
          <h3>Predictive Insights</h3>
          <p>Stay ahead of market trends with our AI-powered predictions.</p>
        </div>
        <div className={styles.featureItem}>
          <DollarSign size={48} />
          <h3>Investment Recommendations</h3>
          <p>Get personalized investment advice based on thorough analysis.</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        {user ? (
          <Link to="/dashboard" className={styles.button}>Go to Dashboard</Link>
        ) : (
          <Link to="/login" className={styles.button}>Get Started</Link>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Home;