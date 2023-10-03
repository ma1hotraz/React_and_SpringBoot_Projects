
export const Signup = async (UserInfo) => {
   const url = '/user/add';

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(UserInfo),
      });

      if (!response.ok) {
         throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
         const data = await response.json();
         return data !== null ? data : [];
      } else {
         throw new Error('Response is not valid JSON');
      }
   } catch (e) {
      console.log('Error', e);
   }
}