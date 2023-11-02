
import { toast } from "react-toastify";

export const deleteFromTrash = async (noteId) => {
    console.log("deleteFromTrash called")
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;

    const url = `notes/trash/userId/${id}/delete/noteId/${noteId}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });

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
