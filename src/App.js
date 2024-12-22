import React, { useState, useEffect, createContext, Suspense } from 'react';
import axios from 'axios';

import { NotificationProvider } from './components/Notification/Notification';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import './App.css';
import { ThemeProvider, useTheme } from './themes/ThemeProvider';

export const userContext = createContext({});

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({});
  const [updateUser, setUpdateUser] = useState(false);

  const whoAmI = () => {
    axios
      .get(`http://localhost:8000/api/session/whoami`, (axios.defaults.withCredentials = true))
      .then((response) => {
        setUserData(response.data);
        return true;
      })
      .catch(() => {
        setUserData(null);
        return false;
      });
  };

  useEffect(() => {
    whoAmI();
  }, [updateUser]);

  const [open, setOpen] = useState(false);

  return (
    <NotificationProvider>
      <div className="App" style={{ backgroundColor: theme.palette.background.default }}>
        <userContext.Provider value={userData}>
          <Header
            openRegLogModal={open}
            setOpenRegLogModal={setOpen}
            updateUser={() => setUpdateUser(!updateUser)}
          />
          <Suspense fallback={<Loading />}>
            <Content updateUser={() => setUpdateUser(!updateUser)} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        </userContext.Provider>
      </div>
    </NotificationProvider>
  );
}

export default AppWrapper;
