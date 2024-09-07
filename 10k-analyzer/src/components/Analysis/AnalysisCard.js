import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Loader } from 'lucide-react';
import styles from './Analysis.module.css';

const AnalysisCard = ({ analysis }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <BarChart2 className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{analysis.subject}</h3>
      </div>
      <div className={styles.cardContent}>
        {analysis.status === 'pending' ? (
          <div className={styles.cardStatus}>
            <Loader className={styles.statusIcon} />
            <span>Analyzing...</span>
          </div>
        ) : (
          <div className={styles.cardStatus}>
            <CheckCircle className={styles.statusIcon} />
            <span>Analysis complete</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisCard;