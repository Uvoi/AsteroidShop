import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css'

const NotificationContext = React.createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notificationDelay, setNotificationDelay] = useState(2500);

  const showNotification = (text, color, time=2500) => {
    setNotification({ text, color });
    setNotificationDelay(time);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, notificationDelay);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <AnimatePresence>
  {notification && (
    <motion.div
      id='notification_wrapper'
      initial={{ top: '-100px' }}
      animate={{ top: '10px' }}
      exit={{ top: '-100px', opacity: 0 }}
      transition={{ duration: 0.15, type: 'spring', stiffness: 350, damping: 30 }}
    >
      <div 
        id='notification' 
        style={{ backgroundColor: notification.color }}>  
        {notification.text}
      </div>
    </motion.div>
  )}
</AnimatePresence>


    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
