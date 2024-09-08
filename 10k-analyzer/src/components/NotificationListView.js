import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NotificationContext } from '../contexts/NotificationContext';
import styles from '../styles/NotificationListView.module.css';

const NotificationListView = ({ onClose }) => {
  const { notifications, removeNotification, markAsRead } = useContext(NotificationContext);

  return (
    <motion.div 
      className={styles.notificationList}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.header}>
        <h3>Notifications</h3>
        <button onClick={onClose}><X size={20} /></button>
      </div>
      {notifications.length === 0 ? (
        <p className={styles.emptyMessage}>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`${styles.notification} ${notification.read ? styles.read : styles.unread}`}
              onClick={() => markAsRead(notification.id)}
            >
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <button onClick={() => removeNotification(notification.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default NotificationListView;