import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToggleSlider } from 'react-toggle-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faMoon, faRedo, faSun } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from './ProfileModal';


const drawerWidth = 240;

function DrawerAppBar(props) {

  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);


  const navItems = [
    <FontAwesomeIcon icon={faRedo} size='2x' />,
    <FontAwesomeIcon icon={faList} size='2x' />,
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FontAwesomeIcon key="sun" style={{ marginRight: '20px', marginLeft: '10px' }} icon={faSun} size='2x' />
      <ToggleSlider key="slider" onToggle={props.toggleMode} active={!props.active} />
      <FontAwesomeIcon key="moon" style={{ marginLeft: '20px', marginRight: '10px' }} icon={faMoon} size='2x' />
    </Box>,
    <ProfileModal/>
  ];


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {props.name}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" >
        <Toolbar sx={{ backgroundColor: `${props.navbar}` }} in Toolbar>
          <IconButton
            color="transparent"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: `${[props.navMenuIconColor]}` }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: 'white', fontFamily: 'Poppins, sans-serif' } }}
          >
            {props.name}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
  name: PropTypes.string,
  nav: PropTypes.string
};

DrawerAppBar.defaultProps = {
  nav: 'yellow',
  name: 'null'
}

export default DrawerAppBar;