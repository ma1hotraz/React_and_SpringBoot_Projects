import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideButton(props) {
    return (
        <div className='container flex p-2'>
            <div>
                <FontAwesomeIcon icon={props.iconType} style={{ color: "#ffffff" }} size='lg'/>
            </div>
            <div className='w-2'></div>
            <div>
                <h1 className='text-primary-font text-lg font-Primary'>{props.name}</h1>
            </div>
        </div>
    )
}

SideButton.propTypes = {
    name: PropTypes.string
};

SideButton.defaultProps = {
    name: null
};
