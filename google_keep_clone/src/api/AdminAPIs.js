import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import getLocale from "../utils/SettingLocale";
import { getRandomColor } from '../utils/ColorList';


export const adminLogin = async (UserInfo) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/admin/login`;

    const signInObj = {
        email: UserInfo.get("email"),
        password: UserInfo.get("password"),
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signInObj),
        });


        if (response.status === 500) {
            toast.warn('Server Error !', {
                autoClose: 1000,
            });
            return;
        }

        if (response.status === 409) {
            toast.warn('Email Exist, Please Login', {
                autoClose: 1000,
            });
            return;
        }

        if (response.status === 401) {
            toast.warn('Email or Password Wrong', {
                autoClose: 1000,
            });
            throw new Error('Network response was not ok');
        }

        if (!response.ok) {
            toast.warn('Something Went Wrong', {
                autoClose: 1000,
            });
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data !== null) {
                sessionStorage.setItem('userData', JSON.stringify(data));
                const locale = navigator.language;
                const currLocale = getLocale(locale);
                localStorage.setItem('lang', JSON.stringify(currLocale));
                localStorage.setItem('avtarCol', JSON.stringify(getRandomColor()));
                return data;
            }

        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (e) {
        console.log('Error', e);
    }
}



export const getTotalUserSize = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/admin/getAllNumber`;

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
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/admin/getDBSize`;

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
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const url = `${baseUrl}/admin/getAllUser`;

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
        console.log('Error', e);
    }
}

export const serverStatus = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    try {
        const url = `${baseUrl}/actuator/health`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

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


