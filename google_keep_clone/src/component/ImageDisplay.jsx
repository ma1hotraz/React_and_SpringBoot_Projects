import React, { useEffect, useState } from 'react';

const ImageDisplay = () => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchImage = () => {
      try {
        
        const dataS = sessionStorage.getItem('userData');
        const imageData = JSON.parse(dataS);

        if (!imageData) {
          return;
        }
        const byteArray = new Uint8Array(atob(imageData.image).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'image/png' });
        const dataUrl = URL.createObjectURL(blob);
        setSource(dataUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return <img src={source} alt='Fetched Image' />
};

export default ImageDisplay;
