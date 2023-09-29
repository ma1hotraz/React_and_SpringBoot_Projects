import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'

function BottomBar(props) {
    return (
        <div className='fixed bottom-4 w-11/12 px-5 py-2 mx-auto bg-navbar-bg'>
            <div className='flex'>
                <img className='rounded-lg' src={props.imageName} alt="Playlist" style={{ height: '60px', width: '60px' }} />
                <div className='px-5 py-2 text-justify'>
                    <h1 className='text-primary-font font-Primary text-md'>Name</h1>
                    <p className='text-secondary-font font-Primary text-xs'>Desc</p>
                </div>
                <div className='py-4'>
                    <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                </div>
                <div className='flex flex-row-reverse items-end'>
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} style={{ color: '#ffffff' }} />
                </div>
            </div>
        </div>
    )
}

BottomBar.propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string
}

export default BottomBar