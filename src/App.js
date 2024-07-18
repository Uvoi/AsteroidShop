import React, {useState, useEffect, createContext} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import { NotificationProvider } from './components/Notification/Notification';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { darkTheme, lightTheme } from './themes/theme';
import './App.css';

export const themeContext = createContext("")

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
      })
      .catch(error => {
        if (error.response.status == 403)
          {
            setUserData(null)
          }

      });
  };

  useEffect(() => {
    whoAmI()
  }, [updateUser])
  
  

  return (
    <NotificationProvider>
      <ThemeProvider theme={theme}> 
        <div className="App" style={{ backgroundColor: theme.palette.background.default}}>
          <themeContext.Provider value={theme}>
            <Header onToggleTheme={toggleTheme} user={userData} updateUser={()=>setUpdateUser(!updateUser)}/>
            <Content user={userData} updateUser={()=>setUpdateUser(!updateUser)}/>
            <Footer/>
          </themeContext.Provider>
        </div>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;
