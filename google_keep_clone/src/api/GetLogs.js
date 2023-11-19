import { toast } from "react-toastify";

export const getLogs = async () => {

    const url = `logs/tail-log`;
    try {
        const response = await fetch(url, { method: 'GET' });

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
