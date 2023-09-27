import React, { useState } from 'react'
import SearchNote from '../api/SearchNote'


export default function SearchBox(noteData) {
    const [data, setData] = useState([]);

    const updateData = (newData) => {
        setData(newData);
    };

    return (
        <div style={{ marginTop: '80px' }}>
            {console.log('HOME')}
            <SearchNote setData={updateData} />
            <ul>
                {console.log(data,"data from NOTEID")}
                {data.length !== 0 ? (
                    <div>{data.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}</div>
                ) : (<div><h1>NO ELEMENT FOUND</h1></div>)}
            </ul>
        </div>
    );
}
