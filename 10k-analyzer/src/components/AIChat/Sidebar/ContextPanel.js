import React from 'react';
import { User, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/AIAdvisor.module.css';

function ContextPanel() {
  const { user } = useAuth();
  // In a real application, you'd fetch this data from a user profile or derive it from conversation history
  const userContext = {
    riskTolerance: 'Moderate',
    investmentGoals: ['Long-term growth', 'Retirement planning'],
    preferredSectors: ['Technology', 'Healthcare']
  };

  return (
    <div className={styles.contextPanel}>
      <h3 className={styles.panelTitle}>Your Profile</h3>
      <div className={styles.profileItem}>
        <User size={20} />
        <span>{user.email}</span>
      </div>
      <div className={styles.profileItem}>
        <AlertTriangle size={20} />
        <span>Risk Tolerance: {userContext.riskTolerance}</span>
      </div>
      <div className={styles.profileItem}>
        <TrendingUp size={20} />
        <span>Investment Goals:</span>
        <ul>
          {userContext.investmentGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
      <div className={styles.profileItem}>
        <span>Preferred Sectors:</span>
        <ul>
          {userContext.preferredSectors.map((sector, index) => (
            <li key={index}>{sector}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContextPanel;