import { useTheme } from '@emotion/react';

import Header from '../component/DrawerAppBar'
import Note from '../component/Note';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import SearchBox from '../component/SearchBox';

export default function Home() {

    const [cookies, setCookie] = useCookies(['keeper', 'active']);
    const [themeType, setThemeType] = useState(cookies.keeper || false);
    const [isActive, setActive] = useState(cookies.active || false);

    useEffect(() => {
        setCookie('keeper', themeType);
        setCookie('active', isActive);
    }, [themeType, isActive, setCookie]);

    const toggleMode = () => {
        setThemeType((prevThemeType) => {
            const newThemeType = !prevThemeType;
            setCookie('keeper', newThemeType);
            setActive(!newThemeType);
            console.log(cookies, " -cookie ", isActive, " -isActive");
            return newThemeType;
        });
    };

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



    const themeColor = themeType ? primaryDarkColor : primaryLightColor;
    const navbarColor = themeType ? secondaryNavColor : primaryNavColor;
    const textColor = themeType ? secondaryTextColor : primaryTextColor;
    const backgroundColor = themeType ? secondaryBackgroundColor : primaryBackgroundColor;
    const navMenuIconColor = themeType ? secondarynavMenuIconColor : primarynavMenuIconColor;

    

    return (
        <div style={{
            backgroundColor: `${backgroundColor}`, minHeight: "100vh"
        }}>
            
            <Header name={'Keeper'} toggleMode={toggleMode} active={isActive} themeColor={themeColor} textColor={textColor} navbar={navbarColor} navMenuIconColor={navMenuIconColor} />
        
            <Box sx={{ padding: '15px' }}>
                {/* <SearchBox /> */}
                <Note color={textColor} backgroundColor={themeColor} />
            </Box>

        </div>
    );
}
