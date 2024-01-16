import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import i18n from '../i18n/i18n';

export default function TranslateButton() {
    const [locale, setLocale] = useState(i18n.language);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (selectedLocale) => {
        setLocale(selectedLocale);
        localStorage.setItem('lang', selectedLocale);
        sessionStorage.setItem('lang', locale);
        setAnchorEl(null);
        window.location.reload();
    };

    useEffect(() => {
        const savedLocale = localStorage.getItem('lang');
        if (savedLocale) {
            setLocale(savedLocale);
        }
    }, []);

    return (
        <div>
            <Tooltip title={'Language'}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon
                        icon={faLanguage}
                        size='2x'
                        color={`white`}
                    />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
                    <MenuItem onClick={() => handleClose('hi')}>हिंदी</MenuItem>
                    <MenuItem onClick={() => handleClose('cn')}>中国人</MenuItem>
                </Menu>
            </Tooltip>
        </div>
    );
}
