import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NotificationContext } from '../contexts/NotificationContext';
import styles from '../styles/NotificationSystem.module.css';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className={styles.notificationContainer}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={styles.notification}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className={styles.notificationContent}>
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => removeNotification(notification.id)}
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;