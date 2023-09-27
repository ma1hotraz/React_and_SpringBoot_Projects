import { useEffect } from "react";

export const getById = async (id) => {
    const url = `notes/getNote/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data !== null ? data : [];
        }
        else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function EditNote(props) {
    useEffect(() => {
        getById(props.id)
            .then((fetchedData) => {
                props.setData(fetchedData); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [props.id]);

    return null;
}
