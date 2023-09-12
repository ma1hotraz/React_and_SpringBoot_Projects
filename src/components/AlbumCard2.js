import React from 'react'
import PropTypes from 'prop-types'

function AlbumCard2(props) {
    return (
        <div className='m-4 p-2 bg-slate-800'>
            <div>
                <img className='mx-auto p-1 rounded-lg' src={props.imageName} alt="Playlist" style={{ height: '150px', width: '150px' }} />
            </div>
            <div>
                <h1 className='text-primary-font text-lg text-start px-2 font-Primary'>{props.name}</h1>
                <p className='text-secondary-font text-sm px-2 font-Primary'>{props.desc}</p>
            </div>
        </div>
    )
}

AlbumCard2.propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string
}

AlbumCard2.defaultProps = {
    name: null
}
export default AlbumCard2
