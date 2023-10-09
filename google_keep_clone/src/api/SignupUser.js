import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = async (UserInfo) => {
   const url = 'user/add';

   const signUpObj = {
      firstName: UserInfo.get("firstname"),
      lastName: UserInfo.get("lastname"),
      email: UserInfo.get("email"),
      password: UserInfo.get("password"),
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
            autoClose: 3000,
         });
         return;
      }

      if (response.status === 409) {
         toast.warn('Email Exist, Please Login', {
            autoClose: 3000,
         });
         return;
      }

      if (!response.ok) {
         toast.warn('Something went wrong', {
            autoClose: 3000,
         });
         throw new Error('Network response was not ok');
      }


      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         const data = await response.json();
         if (data !== null) {
            sessionStorage.setItem('userData', JSON.stringify(data));
            return data;
         }

      } else {
         throw new Error('Response is not valid JSON');
      }
   } catch (e) {
      console.log('Error', e);

   }
}