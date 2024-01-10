import { toast } from "react-toastify";
import authHeader from "./authHeader";

export const deleteById = async (id) => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/notes/delete/${id}`


    try {
        const response = await fetch(url, {
            headers: authHeader(),
            method: 'DELETE',
        });

        if (response.status === 204) {
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

