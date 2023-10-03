import { useEffect } from "react";

import '../css/NoData.css';

const getCurrentDateTime = () => {
    const now = new Date();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeZoneAbbreviation = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateTimeString = `${dayOfWeek} ${month} ${day} ${hours}:${minutes}:${seconds} ${timeZoneAbbreviation} ${year}`;

    return dateTimeString;
}


export const addNote = async (noteData) => {

    noteData.date = getCurrentDateTime();

    console.log(noteData);

    const url = 'notes/add';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data !== null ? data : [];
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function AddNote(props) {
    useEffect(() => {
        addNote(props.noteData)
            .then((fetchedData) => {
                props.setData(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [props.noteData]);

    return null;
}
