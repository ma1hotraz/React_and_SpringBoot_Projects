// import { TextField } from '@mui/material'
// import React, { useState } from 'react'

// export default function SearchMenu() {

//     // const [searchText, setSearchText] = useState('');

//     // const handleInputChange = (event) => {
//     //     setSearchText(event.target.value);
//     //     console.log(searchText);
//     // };

//     return (
//         <div style={{ paddingRight: '20px', }}>
//             <TextField
//                 style={{ backgroundColor: 'white', borderRadius: '10px' }}
//                 label="Search"
//                 variant="filled"
//                 size='small'
//                 fullWidth
//                 type='text'
//                 // value={searchText}
//                 // onChange={handleInputChange}
//             />
//         </div>
//     )
// }


import { TextField } from '@mui/material';
import React from 'react';

export default function SearchMenu({ onChange }) {

    const handleInputChange = (event) => {
        const searchText = event.target.value;
        onChange(searchText); 
    };

    return (
        <div style={{ paddingRight: '20px', }}>
            <TextField
                style={{ backgroundColor: 'white', borderRadius: '10px'}}
                placeholder='Search'
                variant="filled"
                size='small'
                fullWidth
                type='text'
                onChange={handleInputChange}
                inputProps={{ style: { fontSize: '16px' } }}
            />
        </div>
    )
}
