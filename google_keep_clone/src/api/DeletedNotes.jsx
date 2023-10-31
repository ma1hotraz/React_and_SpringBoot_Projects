import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'



export const getDeletedNotes = async () => {


    // const url = `notes/userId/${id}`;
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            toast.warn('Server Error !', {
                autoClose: 3000,
            });
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {

            const data = await response.json();

            console.log(data);

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

export default function DeletedNotes({ setData }) {
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;

    useEffect(() => {
        getDeletedNotes()
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id, setData]);

}

DeletedNotes.propTypes = {
    setData: PropTypes.func,
};
