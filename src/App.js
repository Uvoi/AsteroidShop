import React, {useState, useEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { NotificationProvider } from './components/Notification/Notification';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { darkTheme, lightTheme } from './themes/theme';
import './App.css';

function App() {
  const storedTheme = localStorage.getItem('theme');
  const [currentTheme, setCurrentTheme] = useState(storedTheme == "lightTheme" ? lightTheme: darkTheme); 

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
  

  return (
    <NotificationProvider>
      <ThemeProvider theme={theme}> 
        <div className="App" style={{ backgroundColor: theme.palette.background.default}}>
          <Header onToggleTheme={toggleTheme} theme={theme} />
          <Content theme={theme}/>
          <Footer theme={theme}/>
        </div>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;
