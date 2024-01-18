import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverStatus } from './AdminAPIs';
import authHeader from './authHeader';

export const getDeletedNotes = async () => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/trash/`;

    try {

        if (await serverStatus() !== null) {

            const response = await fetch(url, {
                headers: authHeader()
            });

            if (!response.ok) {
                toast.warn('Server Error !', {
                    autoClose: 1000,
                });
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
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};