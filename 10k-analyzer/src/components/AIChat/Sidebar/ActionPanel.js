import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../../../styles/AIAdvisor.module.css';

function ActionPanel() {
  // This is placeholder data. In a real application, these would be dynamically generated based on the AI's analysis.
  const actions = [
    { type: 'recommendation', text: 'Consider diversifying your portfolio with more international stocks.' },
    { type: 'alert', text: 'Your tech sector allocation is above your risk threshold.' },
    { type: 'recommendation', text: 'Review your retirement contributions to maximize tax benefits.' },
  ];

  return (
    <div className={styles.actionPanel}>
      <h3 className={styles.panelTitle}>Insights & Actions</h3>
      <ul className={styles.actionList}>
        {actions.map((action, index) => (
          <li key={index} className={styles.actionItem}>
            {action.type === 'recommendation' ? (
              <CheckCircle size={20} className={styles.recommendationIcon} />
            ) : (
              <AlertCircle size={20} className={styles.alertIcon} />
            )}
            <span>{action.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionPanel;