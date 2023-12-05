import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getDeletedNotes = async () => {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const userId = user?.userId;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/trash/userId/${userId}`;

    const token = user?.response;


    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });

        if (!response.ok) {
            toast.warn('Server Error !', {
                autoClose: 2000,
            });
            // throw new Error('Network response was not ok');
            return [];
        }

        if (response.status === 204) {
            return [];
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            try {
                const data = await response.json();
                return data !== null ? data : [];
            } catch (jsonError) {
                throw new Error('Response is not valid JSON');
            }
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};