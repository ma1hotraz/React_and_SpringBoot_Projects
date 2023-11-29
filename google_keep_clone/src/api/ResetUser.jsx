import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Reset = async (UserInfo) => {
    const url = 'user/auth/forget';

    const signUpObj = {
        email: UserInfo.get("email"),
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpObj),
        });

        if (response.status === 500) {
            toast.warn('Server Error !', {
                autoClose: 2000,
            });
            return;
        }

        if (response.status === 409) {
            toast.warn('Email Not Exist', {
                autoClose: 2000,
            });
            return;
        }

        if (!response.ok) {
            toast.warn('Something Went Wrong', {
                autoClose: 2000,
            });
            throw new Error('Network response was not ok');
        }

        toast.success('Check Email', { autoClose: 1000 });

    } catch (e) {
        console.log('Error', e);
    }
}