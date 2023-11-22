import { toast } from "react-toastify";

export const deleteById = async (id) => {
    const url = `notes/delete/${id}`
 
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if(response.status === 204){
            return [];
        }


        if (!response.ok) {
            // throw new Error('Network response was not ok');
            toast.error('Server Error', 1000);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

