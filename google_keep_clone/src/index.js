
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

const theme = createTheme({
  palette: {
    primary: {
      main: '#71797E',
      navbar: '#F4B400',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      navMenuIconColor: '#000000',
      modalBg: '#FFFFFF',
    },
    secondary: {
      main: '#202124',
      navbar: '#202124',
      backgroundColor: '#202124',
      textColor: '#FFFFFF',
      navMenuIconColor: '#FFFFFF',
      modalBg: '#D5D5D5',
    }
  },
});

const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <div>
      <I18nextProvider i18n={i18n} />
      <ThemeProvider theme={theme}>
        {/* <Router> */}
          <App />
        {/* </Router> */}
        <ToastContainer position='top-right' />
      </ThemeProvider>
    </div>
  );
};

renderApp();
