import React from 'react';
import PropTypes from 'prop-types';

export default function TextBar(props) {
  return (
    <div className={`py-4 px-2 ${props.size}`}>
      <h1 className='text-primary-font font-Primary'>{props.title}</h1>
    </div>
  );
}

TextBar.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
};

TextBar.defaultProps = {
  title: null,
  size: '',
};
