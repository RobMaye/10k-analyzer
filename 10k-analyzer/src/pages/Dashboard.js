import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, TrendingUp, DollarSign, PieChart, Activity, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const mockData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <motion.div 
    className={styles.card}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={32} color={color} />
    <h3>{title}</h3>
    <p className={styles.cardValue}>{value}</p>
  </motion.div>
);

function Dashboard() {
  const { user } = useAuth();
  const [selectedChart, setSelectedChart] = useState('performance');

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

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.title} variants={itemVariants}>Welcome to Your Dashboard</motion.h1>
      <motion.p className={styles.subtitle} variants={itemVariants}>Hello, {user.email}!</motion.p>
      
      <motion.div className={styles.cardContainer} variants={itemVariants}>
        <DashboardCard title="Portfolio Value" value="$250,000" icon={DollarSign} color="#3498db" />
        <DashboardCard title="Total Gain" value="+15.4%" icon={TrendingUp} color="#2ecc71" />
        <DashboardCard title="Assets" value="25" icon={PieChart} color="#e74c3c" />
        <DashboardCard title="Risk Score" value="Moderate" icon={Activity} color="#f39c12" />
      </motion.div>

      <motion.div className={styles.chartContainer} variants={itemVariants}>
        <div className={styles.chartHeader}>
          <h2>Portfolio {selectedChart === 'performance' ? 'Performance' : 'Analysis'}</h2>
          <div className={styles.chartToggle}>
            <button 
              className={selectedChart === 'performance' ? styles.active : ''}
              onClick={() => setSelectedChart('performance')}
            >
              Performance
            </button>
            <button 
              className={selectedChart === 'analysis' ? styles.active : ''}
              onClick={() => setSelectedChart('analysis')}
            >
              Analysis
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3498db" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div className={styles.recentAnalyses} variants={itemVariants}>
        <h2>Recent Analyses</h2>
        <ul>
          <li>
            <span>Apple Inc. (AAPL)</span>
            <span>Completed on Sept 5, 2024</span>
            <Link to="/analysis/aapl" className={styles.viewMore}>
              View <ArrowRight size={16} />
            </Link>
          </li>
          <li>
            <span>Tesla, Inc. (TSLA)</span>
            <span>Completed on Sept 3, 2024</span>
            <Link to="/analysis/tsla" className={styles.viewMore}>
              View <ArrowRight size={16} />
            </Link>
          </li>
          <li>
            <span>Microsoft Corporation (MSFT)</span>
            <span>Completed on Aug 30, 2024</span>
            <Link to="/analysis/msft" className={styles.viewMore}>
              View <ArrowRight size={16} />
            </Link>
          </li>
        </ul>
      </motion.div>

      <motion.div className={styles.actionContainer} variants={itemVariants}>
        <Link to="/analysis" className={styles.button}>
          <BarChart2 size={20} />
          <span>Start New Analysis</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;