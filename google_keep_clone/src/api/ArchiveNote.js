import { toast } from "react-toastify";
import authHeader from "./authHeader";

export const archivedTo = async (noteId) => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/archive/addArchive/noteId/${noteId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeader()
        });

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            // throw new Error('Network response was not ok');
            return [];
        }

        if (response.ok) {
            toast.success('Archived Successfully!', {
                autoClose: 2000,
            });
            return true;
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};
