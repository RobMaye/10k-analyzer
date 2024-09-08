import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/ExpandableResponse.module.css';

const ExpandableResponse = ({ response, reasoningProcess }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderReasoningProcess = (process) => {
    if (typeof process === 'string') {
      return <p>{process}</p>;
    }
    if (Array.isArray(process)) {
      return (
        <ul>
          {process.map((item, index) => (
            <li key={index}>{renderReasoningProcess(item)}</li>
          ))}
        </ul>
      );
    }
    if (typeof process === 'object') {
      return (
        <div>
          {Object.entries(process).map(([key, value]) => (
            <div key={key}>
              <h4>{key}</h4>
              {renderReasoningProcess(value)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.expandableResponse}>
      <div className={styles.response}>{response}</div>
      <motion.button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        {isExpanded ? 'Hide Reasoning Process' : 'Show Reasoning Process'}
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.reasoningProcess}
          >
            <h3>Reasoning Process</h3>
            {renderReasoningProcess(reasoningProcess)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableResponse;