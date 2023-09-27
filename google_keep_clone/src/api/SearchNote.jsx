import { useEffect, useState } from "react";

export const getByTitle = async (title) => {
    
    const url = `notes/getByTitle/${title}`;
console.log(url)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log(data);
            return data !== null ? data : [];

        } else {

            throw new Error('Response is not valid JSON');
        }

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function SearchNote(props) {

    const [noteData, setNoteData] = useState(props.title);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByTitle(props.title, {});
                setNoteData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [props.title]);


    return noteData || null;
}
