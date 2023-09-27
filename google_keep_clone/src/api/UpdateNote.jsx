import { useEffect, useState } from "react";

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

export const updateData = async (id, updatedData) => {

    updatedData.date = getCurrentDateTime();
    updatedData.completed = true;

    const url = `notes/noteId/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data !== null ? data : {};
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const UpdateNote = (props) => {
    const [noteData1, setNoteData1] = useState(props.noteData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await updateData(props.id, {});
                setNoteData1(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.id]);

    console.log(noteData1);

    return noteData1 || {};
};

export default UpdateNote;
