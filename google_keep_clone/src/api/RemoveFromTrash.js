
import { toast } from "react-toastify";
import authHeader from "./authHeader";

export const deleteFromTrash = async (noteId) => {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/trash/delete/noteId/${noteId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: authHeader(),
        });

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            throw new Error('Network response was not ok');
        }

        if (response.ok) {
            toast.success('Deleted Successfully!', {
                autoClose: 2000,
            });
            return true;
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};
