import Header from '../component/DrawerAppBar';
import Note from '../component/Note';
import { useState, useEffect } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './ErrorPage';
import LanguageSelector from '../component/LanguageSelector';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { time } from '../utils/GetTime';
import greet from '../utils/Greet';
import ThemeChange from '../component/ThemeChange';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['keeper', 'active']);
  const [themeType, setThemeType] = useState(cookies.keeper || false);
  const [isActive, setActive] = useState(cookies.active || false);
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.main;
  const primaryNavColor = theme.palette.primary.navbar;
  const primaryBackgroundColor = theme.palette.primary.backgroundColor;
  const primaryDarkColor = theme.palette.secondary.main;
  const secondaryNavColor = theme.palette.secondary.navbar;
  const secondaryBackgroundColor = theme.palette.secondary.backgroundColor;
  const primaryTextColor = theme.palette.primary.textColor;
  const secondaryTextColor = theme.palette.secondary.textColor;
  const primarynavMenuIconColor = theme.palette.primary.navMenuIconColor;
  const secondarynavMenuIconColor = theme.palette.secondary.navMenuIconColor;
  const primaryModalBg = theme.palette.primary.modalBg;
  const secondaryModalBg = theme.palette.secondary.modalBg;
  const primaryButtonColor = theme.palette.primary.navMenuIconColor;
  const secondaryButtonColor = theme.palette.secondary.navMenuIconColor;

  const themeColor = themeType ? primaryDarkColor : primaryLightColor;
  const navbarColor = themeType ? secondaryNavColor : primaryNavColor;
  const textColor = themeType ? secondaryTextColor : primaryTextColor;
  const backgroundColor = themeType ? secondaryBackgroundColor : primaryBackgroundColor;
  const navMenuIconColor = themeType ? secondarynavMenuIconColor : primarynavMenuIconColor;
  const buttonColor = themeType ? secondaryButtonColor : primaryButtonColor;
  const modalBg = themeType ? secondaryModalBg : primaryModalBg;

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const hasModalBeenShown = localStorage.getItem('modalShown');

    if (storedUserData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    setCookie('keeper', themeType);
    setCookie('active', isActive);

    if (!hasModalBeenShown) {
      setShowModal(true);
    }

  }, [themeType, isActive, setCookie]);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('modalShown', 'true');
  };

  const toggleMode = () => {
    setThemeType((prevThemeType) => {
      const newThemeType = !prevThemeType;
      setCookie('keeper', newThemeType);
      setActive(!newThemeType);
      return newThemeType;
    });
  };

  if (loading) {
    return <div><ErrorPage /></div>;
  }

  const userData = JSON.parse(localStorage.getItem('userData'));
  const name = userData.name;
  const message = greet(time);

  return (
    <div style={{ backgroundColor: `${backgroundColor}` }}>
      {themeType && <ThemeChange value={themeType} />}
      {!themeType && <ThemeChange value={themeType} />}
      <Header name={'Keeper'} toggleMode={toggleMode} active={isActive} themeColor={themeColor} textColor={textColor} navbar={navbarColor} navMenuIconColor={navMenuIconColor} modalBg={modalBg} />
      <LanguageSelector />
      <Box sx={{ padding: '15px' }}>
        <Note color={textColor} backgroundColor={themeColor} buttonColor={buttonColor} modalBg={modalBg} />
      </Box>

      <Modal
        open={showModal}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 400,
            p: 2,
            borderRadius: '15px',
            backgroundColor: `${modalBg}`,
            color: `${!textColor}`,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button onClick={handleClose} sx={{}}>
                <CloseIcon />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
              <Typography variant='h5' sx={{ fontFamily: "'Inconsolata', monospace" }}>
                {message} {name.split(' ')[0]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

