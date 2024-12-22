import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css'

const NotificationContext = React.createContext<((text: string, color: string, time?: number) => void) | null>(null);

interface NotificationProviderProps{
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<{text: string, color: string}>({text:"",color:""});
  const [notificationDelay, setNotificationDelay] = useState(2500);

  const showNotification = (text:string, color:string, time=2500) => {
    setNotification({ text, color });
    setNotificationDelay(time);
  };

  useEffect(() => {
    if (notification.text != "" && notification.color !="") {
      const timer = setTimeout(() => {
        setNotification({text:"",color:""});
      }, notificationDelay);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <AnimatePresence>
  {(notification.text != "" && notification.color !="") && (
    <motion.div
      id='notification_wrapper'
      initial={{ top: '-100px',}}
      animate={{ top: '10px',}}
      exit={{ top: '-100px', opacity: 0, height:0 }}
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
