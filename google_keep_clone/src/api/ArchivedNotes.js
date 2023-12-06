import { toast } from "react-toastify";
import { serverStatus } from './AdminAPIs';

export const archivedList = async () => {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;
    const token = user?.response;

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/archive/userId/${id}`;


    try {

        if (await serverStatus() !== null) {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (!response.ok) {
                toast.warn('Server Error!', {
                    autoClose: 2000,
                });
                // throw new Error('Network response was not ok');
                return [];
            }
            if (response.status === 204) {
                return [];
            }
            const data = await response.json();
            return data !== null ? data : [];
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};


export const restoreFromArchive = async (noteId) => {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/archive/userId/${id}/removeArchive/noteId/${noteId}`;

    try {
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            // throw new Error('Network response was not ok');
            return [];
        }


        toast.success('Moved From Archived', {
            autoClose: 2000,
        });
        return;


    } catch (error) {
        console.error('Error:', error.message);
    }
};