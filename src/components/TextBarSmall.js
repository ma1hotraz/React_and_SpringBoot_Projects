import React from 'react'
import PropTypes from 'prop-types';

export default function TextBar(props) {
    return (
        <div className='py-1 px-2'>
            <h1 className='text-primary-font text-sm text-start font-Primary'>{props.title}</h1>
        </div>
    )
}

TextBar.prototype = {
    title: PropTypes.string
};

TextBar.defaultProps = {
    title: null
};