
import { toast } from "react-toastify";
import authHeader from "./authHeader";

export const restoredFromTrash = async (noteId) => {


    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/trash/restore/noteId/${noteId}`;


    try {
        const response = await fetch(url, {
            method: 'DELETE', headers: authHeader()
        });

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            throw new Error('Network response was not ok');
        }

        if (response.ok) {
            toast.success('Restored Successfully!', {
                autoClose: 2000,
            });
            return true;
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};
