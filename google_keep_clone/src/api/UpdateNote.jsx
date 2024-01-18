import { useEffect, useState } from "react";
import authHeader from "./authHeader";


export const updateData = async (id, updatedData) => {

    updatedData.completed = true;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/noteId/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: authHeader(),
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
    return noteData1 || {};
};

export default UpdateNote;
