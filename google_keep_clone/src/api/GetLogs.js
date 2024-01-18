import { toast } from "react-toastify";

export const getLogs = async () => {


    const url = 'logs/stream-flux';
    try {
        const eventSource = new EventSource(url);

        const response = await fetch(url, { method: 'GET' });
        eventSource.onmessage = (event) => {
            console.log('Received event:', event.data);
        };

        if (!response.ok) {
            toast.warn('Server Error!', {
                autoClose: 1000,
            });
            throw new Error('Network response was not ok');
        }

        if (response.status === 204) {
            return [];
        }

        const data = await eventSource.json();

        return data !== null ? data : [];

    } catch (error) {
        console.error('Error: ', error.message);
    }
};
