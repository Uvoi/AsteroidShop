import { ThemeProvider } from '@mui/material';
import './App.css';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { NotificationProvider } from './components/Notification/Notification';
import theme from '../src/theme/theme'

function App() {
  return (
    <NotificationProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;
