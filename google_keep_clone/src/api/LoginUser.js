export const Login = async (UserInfo) => {
   const url = '/user/login';

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

      if (response.ok) {
         console.log(response,);
         return true;
      } else {
         console.log(response);
         return false;
      }
   } catch (e) {
      console.error('Error', e);
      return false;
   }
}
