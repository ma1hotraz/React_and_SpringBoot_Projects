import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';

const ScrollButton = ({ containerRef }) => {
  const handleScroll = (direction) => {
    const container = containerRef.current;

    if (container) {
      const scrollAmount = direction === 'up' ? -container.scrollHeight : container.scrollHeight;

      container.scrollTo({
        top: direction === 'up' ? 0 : container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
    ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '70%',
        right: '50px',
        padding: '20px',
        justifyContent: 'space-between',
        width: '20px',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ margin: '10px' }}>
        <FontAwesomeIcon icon={faUpLong} size='2x' color='white' onClick={() => handleScroll('up')} />
      </Box>
      <Box sx={{ margin: '10px'}}>
        <FontAwesomeIcon icon={faDownLong} size='2x' color='white' onClick={() => handleScroll('down')} />
      </Box>
    </Box>
  );
};

export default ScrollButton;
