import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, MessageSquare, BarChart2 } from 'lucide-react';
import styles from './Analysis.module.css';
import AnalysisCard from './AnalysisCard';
import ChatWindow from './ChatWindow';
import { processMessage, triggerAnalysis } from '../../utils/analysisHelpers';

const Analysis = () => {
  const [messages, setMessages] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
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

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    const response = processMessage(message);
    setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    
    if (response.includes('Analyzing')) {
      const subject = response.split('Analyzing ')[1].split('...')[0];
      handleNewAnalysis(subject);
    }
  };

  const handleNewAnalysis = (subject) => {
    setAnalyses(prev => [...prev, { subject, status: 'pending' }]);
    setIsProcessing(true);

    triggerAnalysis(subject).then(() => {
      setAnalyses(prev => 
        prev.map(a => a.subject === subject ? { ...a, status: 'complete' } : a)
      );
      setIsProcessing(false);
    });
  };

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.gridContainer} variants={itemVariants}>
        <h2 className={styles.title}>
          <BarChart2 className={styles.titleIcon} />
          Analysis Results
        </h2>
        <motion.div className={styles.grid}>
          <AnimatePresence>
            {analyses.map((analysis, idx) => (
              <AnalysisCard key={idx} analysis={analysis} />
            ))}
          </AnimatePresence>
        </motion.div>
        {isProcessing && (
          <motion.div className={styles.processingIndicator} variants={itemVariants}>
            <Loader className={styles.spinner} />
            <p>Processing analysis...</p>
          </motion.div>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <ChatWindow messages={messages} onNewMessage={handleNewMessage} />
      </motion.div>
    </motion.div>
  );
};

export default Analysis;