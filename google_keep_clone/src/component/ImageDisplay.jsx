import React, { useEffect, useState } from 'react';

const ImageDisplay = () => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchImage = () => {
      try {
        const dataS = sessionStorage.getItem('userData');
        const imageData = JSON.parse(dataS);

         // console.log("THIS IS DATA", imageData);

        if (!imageData || !imageData.image) {
          // console.error('Image data not found in sessionStorage');
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

  return  <img src={source}  alt='Fetched Image' />
};

export default ImageDisplay;
