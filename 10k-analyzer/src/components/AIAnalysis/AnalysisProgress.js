import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import styles from '../../styles/AnalysisProgress.module.css';

const AnalysisProgress = ({ progress, stage }) => {
  const stages = ['Data Collection', 'Processing', 'Analysis', 'Generating Report'];

  return (
    <div className={styles.progressContainer}>
      <h3>Analysis in Progress</h3>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p>{progress.toFixed(0)}% Complete</p>
      <div className={styles.stagesContainer}>
        {stages.map((s, index) => (
          <div key={index} className={`${styles.stage} ${index <= stages.indexOf(stage) ? styles.active : ''}`}>
            {index < stages.indexOf(stage) ? (
              <span className={styles.completedStage}>✓</span>
            ) : index === stages.indexOf(stage) ? (
              <Loader className={styles.loadingStage} />
            ) : null}
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisProgress;