import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MarketDataContext } from '../contexts/MarketDataContext';
import styles from '../styles/MarketDataTicker.module.css';

const MarketDataTicker = () => {
  const { marketData } = useContext(MarketDataContext);

  return (
    <div className={styles.tickerContainer}>
      <motion.div
        className={styles.ticker}
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {marketData.map((item, index) => (
          <div key={index} className={styles.tickerItem}>
            <span className={styles.symbol}>{item.symbol}</span>
            <span className={styles.price}>${item.price.toFixed(2)}</span>
            <span className={`${styles.change} ${item.change >= 0 ? styles.positive : styles.negative}`}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketDataTicker;