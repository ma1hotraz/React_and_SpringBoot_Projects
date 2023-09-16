import { useTheme } from '@emotion/react';
import './App.css';
import Header from './component/DrawerAppBar'
import Note from './component/Note';
import { useState } from 'react';
import * as React from 'react';
import { Box } from '@mui/material';


function App() {
  const [themeType, setThemeType] = useState(false);

  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.main;
  const primaryNavColor = theme.palette.primary.navbar;
  const primaryBackgroundColor = theme.palette.primary.backgroundColor;
  const primaryDarkColor = theme.palette.secondary.main;
  const secondaryNavColor = theme.palette.secondary.navbar;
  const secondaryBackgroundColor = theme.palette.secondary.backgroundColor;
  const primaryTextColor = theme.palette.primary.textColor;
  const secondaryTextColor = theme.palette.secondary.textColor;


  const themeColor = themeType ? primaryDarkColor : primaryLightColor;
  const navbarColor = themeType ? secondaryNavColor : primaryNavColor;
  const textColor = themeType ? secondaryTextColor : primaryTextColor;
  const backgroundColor = themeType ? secondaryBackgroundColor : primaryBackgroundColor;



  return (
    <div style={{
      backgroundColor: `${backgroundColor}` , minHeight:"100vh" }}>
      <Header name={'Keeper'} toggleMode={setThemeType} themeColor={themeColor} textColor={textColor} navbar={navbarColor} />
      <Box sx={{ padding: '15px' }}>
        <Note color={textColor} backgroundColor={themeColor} />
      </Box>
    </div>
  );
}

export default App;
