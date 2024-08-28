import React, {useState, useEffect, createContext, Suspense} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import { NotificationProvider } from './components/Notification/Notification';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading'
import { darkTheme, lightTheme } from './themes/theme';
import './App.css';

export const themeContext = createContext("")
export const userContext = createContext({})

function App() {
  const storedTheme = localStorage.getItem('theme');
  const [currentTheme, setCurrentTheme] = useState(storedTheme == "lightTheme" ? lightTheme: darkTheme); 
  const [userData, setUserData] = useState({}); 
  const [updateUser, setUpdateUser] = useState(false)

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };  

  useEffect(() => {
    setCurrentTheme(storedTheme == "lightTheme" ? lightTheme: darkTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme == darkTheme ? "darkTheme" : "lightTheme");
  }, [currentTheme]);

  const theme = currentTheme;

  const whoAmI = () => {
    axios
      .get(`http://localhost:8000/api/session/whoami`, axios.defaults.withCredentials = true)
      .then(response => {
        setUserData(response.data)
        return true
      })
      .catch(error => {
            setUserData(null)
            return false
      });
  };

  useEffect(() => {
    if (whoAmI())
    {
      
    }
  }, [updateUser])
  
  const [open, setOpen] = useState(false);
  
  return (
    <NotificationProvider>
      <ThemeProvider theme={theme}> 
        <div className="App" style={{ backgroundColor: theme.palette.background.default}}>
          <themeContext.Provider value={theme}>
          <userContext.Provider value={userData}>
            <Header openRegLogModal={open} setOpenRegLogModal={setOpen} onToggleTheme={toggleTheme} updateUser={()=>setUpdateUser(!updateUser)}/>
            <Suspense fallback={<Loading/>}>
            <Content updateUser={()=>setUpdateUser(!updateUser)}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
            <Footer/>
            </Suspense>
          </userContext.Provider>
          </themeContext.Provider>
        </div>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;
