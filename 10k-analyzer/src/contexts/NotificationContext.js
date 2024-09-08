import React, { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    setNotifications(prevNotifications => [
      { id: Date.now(), ...notification, read: false },
      ...prevNotifications
    ]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};