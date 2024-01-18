import React, { useState, useEffect } from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Tooltip, Button, Menu } from '@mui/material';
import { fetchAndRefreshData } from './Note';

export default function SortingList() {
    // Initialize state with the value from local storage or 'Def' if not present
    const [view, setView] = useState(localStorage.getItem('view') || 'Def');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (selectedView) => {
        setAnchorEl(null);
        setView(selectedView);
    };

    useEffect(() => {
        localStorage.setItem('view', view);
        fetchAndRefreshData();
    }, [view]);

    return (
        <div>
            <Tooltip title={'View By'} placement='left'>
                <Button
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faList} size='2x' color={`white`} />
                </Button>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClose('Def')}>None</MenuItem>
                    <MenuItem onClick={() => handleClose('Date')}>Date</MenuItem>
                    <MenuItem onClick={() => handleClose('Title')}>Title</MenuItem>
                </Menu>
            </Tooltip>
        </div>
    );
}
