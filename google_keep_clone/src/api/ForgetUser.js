import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authHeader from './authHeader';

export const ForgetUser = async (UserInfo) => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/user/auth/forget`;

    const signUpObj = {
        email: UserInfo.get("email"),
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(signUpObj),
        });

        if (response.status === 500) {
            toast.warn('Server Error !', {
                autoClose: 1000,
            });
            return;
        }

        if (response.status === 409) {
            toast.warn('Email Not Exist', {
                autoClose: 1000,
            });
            return;
        }

        if (!response.ok) {
            toast.warn('Something Went Wrong', {
                autoClose: 1000,
            });
            throw new Error('Network response was not ok');
        }

        if (response.ok) {
            toast.success('Check Email', { autoClose: 1000 });
            return response;
        }

    } catch (e) {
        console.log('Error', e);
    }
}