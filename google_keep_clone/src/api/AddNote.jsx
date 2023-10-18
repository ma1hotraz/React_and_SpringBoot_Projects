import { useEffect } from "react";

import '../css/NoData.css';

export const addNote = async (noteData) => {

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
