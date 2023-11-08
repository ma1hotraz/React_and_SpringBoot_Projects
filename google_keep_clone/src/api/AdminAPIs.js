import { toast } from "react-toastify";

export const getTotalUserSize = async () => {
    const url = '/admin/getAllNumber';

    const response = await fetch(url);

    if (!response.ok) {
        toast.error('Issue fetching data');
    }

    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data || null;
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (e) {
        // console.log('Error', e);
    }
}


export const getDBSize = async () => {
    const url = '/admin/getDBSize';

    const response = await fetch(url);

    if (!response.ok) {
        toast.error('Issue fetching data');
    }

    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data || null;
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (e) {
        // console.log('Error', e);
    }
}

export const getAllUsers = async () => {
    const url = '/admin/getAllUser';

    const response = await fetch(url);

    if (!response.ok) {
        toast.error('Issue fetching data');
    }

    try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data || [];
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (e) {
        // console.log('Error', e);
    }
}

export const serverStatus = async () => {
    try {
        const url = '/actuator/health';
        
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch server status. Status:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error while fetching server status:", error);
        return null;
    }
};


