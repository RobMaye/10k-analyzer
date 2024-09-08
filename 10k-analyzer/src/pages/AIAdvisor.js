import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatInterface from '../components/AIChat/ChatInterface';
import ContextPanel from '../components/AIChat/Sidebar/ContextPanel';
import VisualizationPanel from '../components/AIChat/Sidebar/VisualizationPanel';
import ActionPanel from '../components/AIChat/Sidebar/ActionPanel';
import MarketDataTicker from '../components/MarketDataTicker';
import NotificationSystem from '../components/NotificationSystem';
import { NotificationContext } from '../contexts/NotificationContext';
import styles from '../styles/AIAdvisor.module.css';

const SIDEBAR_WIDTH = 400; // Set a fixed width for the sidebar

const Sidebar = React.memo(({ isOpen, children }) => {
  return (
    <motion.div
      className={`${styles.sidebar} ${isOpen ? '' : styles.closed}`}
      initial={false}
      animate={{ 
        width: isOpen ? SIDEBAR_WIDTH : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }}
    >
      <div style={{ width: SIDEBAR_WIDTH }}>
        {children}
      </div>
    </motion.div>
  );
});

function AIAdvisor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addNotification } = useContext(NotificationContext);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  useEffect(() => {
    addNotification({
      title: "Welcome to AI Advisor",
      message: "This is a test notification to demonstrate the system."
    });
  }, [addNotification]);

  const sidebarContent = useMemo(() => (
    <>
      <ContextPanel />
      <VisualizationPanel />
      <ActionPanel />
    </>
  ), []);

  return (
    <div className={styles.aiAdvisorContainer}>
      <MarketDataTicker />
      <NotificationSystem />
      <div className={styles.mainContent}>
        <Sidebar isOpen={sidebarOpen}>
          {sidebarContent}
        </Sidebar>
        <div className={styles.chatContainer}>
          <ChatInterface />
        </div>
        <motion.button 
          className={styles.toggleButton}
          onClick={toggleSidebar}
          animate={{ 
            left: sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0',
            rotate: sidebarOpen ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>
    </div>
  );
}

export default AIAdvisor;