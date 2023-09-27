// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// // import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}></ThemeProvider>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      navbar: '#F4B400',
      backgroundColor: '#FFFFFF',
      textColor: '#FFFFFF',
      navMenuIconColor: '#000000',
      main: '#71797E',
    },
    secondary: {
      navbar: '#202124',
      backgroundColor: '#202124',
      textColor: '#FFFFFF',
      navMenuIconColor: '#FFFFFF',
      main: '#202124',
    }
  },
});

const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
};

renderApp();
