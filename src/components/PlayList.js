import React from 'react';
import PropTypes from 'prop-types';

function PlayList(props) {
  return (
    <div className='container flex p-2'>
      <div className='p-2'>
        <img src={props.imageName} alt="Playlist" style={{ height: '30px', width: '30px' }} />
      </div>
      <div className='w-2'></div>
      <div className='py-2'>
        <h1 className='text-primary-font text-lg text-justify font-Primary'>{props.name}</h1>
      </div>
    </div>
  );
}

PlayList.propTypes = {
  name: PropTypes.string,
};

PlayList.defaultProps = {
  name: null,
};

export default PlayList;
