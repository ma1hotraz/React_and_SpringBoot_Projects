import React from 'react';
import PropTypes from 'prop-types';

function AlbumCard1(props) {
  return (
    <div className='container w-52 flex items-center m-4 bg-gray-600 rounded-lg'>
      <div>
        <img className='rounded-lg' src={props.imageName} alt="Playlist" style={{ height: '60px', width: '60px' }} />
      </div>
      <div className='w-2'></div>
      <div>
        <h1 className='text-primary-font text-lg text-start font-Primary'>{props.name}</h1>
      </div>
    </div>
  );
}

AlbumCard1.propTypes = {
  name: PropTypes.string,
  imageName: PropTypes.string.isRequired
};

AlbumCard1.defaultProps = {
  name: null,
};

export default AlbumCard1;
