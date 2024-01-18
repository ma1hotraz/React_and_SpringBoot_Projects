import { toast } from "react-toastify";
import { serverStatus } from './AdminAPIs';
import authHeader from "./authHeader";

export const archivedList = async () => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/archive/`;


    try {

        if (await serverStatus() !== null) {
            const response = await fetch(url, {
                method: 'GET',
                headers: authHeader()
            });

            if (!response.ok) {
                toast.warn('Server Error!', {
                    autoClose: 1000,
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

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const url = `${baseUrl}/notes/archive/removeArchive/noteId/${noteId}`;

    try {
        const response = await fetch(url, { method: 'GET', headers : authHeader() });

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 1000,
            });
            // throw new Error('Network response was not ok');
            return [];
        }

        toast.success('Moved From Archived', {
            autoClose: 1000,
        });
        return;


    } catch (error) {
        console.error('Error:', error.message);
    }
};