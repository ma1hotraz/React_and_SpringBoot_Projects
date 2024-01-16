import React, { useState } from 'react';
import { useRive } from "@rive-app/react-canvas";
import theme_mountain from '../images/rive/theme_mountain.riv';
import '../css/ThemeChange.css';

export default function ThemeChange(props) {

    const [state, setState] = useState(!props.value);

    var visible = true;

    setTimeout(() => {
        visible = false;
    }, 1000);

    const { rive, RiveComponent } = useRive({
        src: theme_mountain,
        autoplay: true,
    });

    const changeState = () => {
        setState(!state);

        if (state) {
            rive && rive.play();
        }
    }

    return (
        <div className='mountainLight' style={{ display: 'flex', position: 'float', visibility: visible }}>
            {state && <RiveComponent onClick={changeState} />}
        </div>
    );
}

ThemeChange.propsTypes = {
    value: Boolean
}

ThemeChange.defaultProps = {
    value: true
}


// import React, { useState, useEffect } from 'react';
// import { useRive } from '@rive-app/react-canvas';
// import theme_mountain from '../images/rive/theme_mountain.riv';
// import '../css/ThemeChange.css';

// export default function ThemeChange(props) {
//     const [isPlaying, setIsPlaying] = useState(!props.value);
//     const [shouldUnmount, setShouldUnmount] = useState(false);

//     const { rive, RiveComponent } = useRive({
//         src: theme_mountain,
//         autoplay: isPlaying,
//         onAnimationFinished: () => {
//             setTimeout(() => {
//                 setShouldUnmount(true);
//             }, 2000);
//         },
//     });

//     useEffect(() => {
//         if (shouldUnmount) {
//             setIsPlaying(false);
//         }
//     }, [shouldUnmount]);

//     const handleTogglePlay = () => {
//         setIsPlaying((prevIsPlaying) => !prevIsPlaying);

//         if (!isPlaying) {
//             rive && rive.play();
//         } else {
//             rive && rive.pause();
//         }
//     };

//     return (
//         <div className={`mountainLight ${isPlaying ? 'playing' : 'paused'}`} style={{ height: '100vh', width: '100%' }}>
//             {isPlaying && <RiveComponent onClick={handleTogglePlay} />}
//         </div>
//     );
// }

// ThemeChange.propTypes = {
//     value: Boolean,
// };

// ThemeChange.defaultProps = {
//     value: true,
// };
