import { toast } from "react-toastify";

export const archivedList = async () => {
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;


    const url = `notes/archive/userId/${id}`;
    try {
        const response = await fetch(url, { method: 'GET' });

        console.log(response);

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            throw new Error('Network response was not ok');
        }

        if (response.status === 204) {
            return [];
        }

        const data = await response.json();
        return data !== null ? data : [];

    } catch (error) {
        console.error('Error:', error.message);
    }
};


export const restoreFromArchive = async (noteId) => {
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const id = user?.userId;


    const url = `notes/archive/userId/${id}/removeArchive/noteId/${noteId}`;
    try {
        const response = await fetch(url, { method: 'GET' });

        console.log(response);

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 2000,
            });
            throw new Error('Network response was not ok');
        }


        toast.success('Moved From Archived', {
            autoClose: 2000,
        });
        return;


    } catch (error) {
        console.error('Error:', error.message);
    }
};