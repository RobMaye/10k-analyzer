import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import styles from '../../../styles/AIAdvisor.module.css';

function VisualizationPanel() {
  const [ref, dimensions] = useResizeObserver();

  // This is placeholder data. In a real application, this would be dynamically generated based on the conversation.
  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  return (
    <div className={styles.visualizationPanel} ref={ref}>
      <h3 className={styles.panelTitle}>Market Trends</h3>
      {dimensions && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default VisualizationPanel;