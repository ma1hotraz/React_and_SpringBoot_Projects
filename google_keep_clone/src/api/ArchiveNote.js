import { toast } from "react-toastify";

export const archivedTo = async (noteId) => {


    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;
    const token = user?.response;

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/archive/userId/${id}/addArchive/noteId/${noteId}`;

    try {
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
