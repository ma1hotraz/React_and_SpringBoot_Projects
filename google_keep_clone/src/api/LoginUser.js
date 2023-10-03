export const Login = async (UserInfo) => {
   const url = '/user/login';

   console.log(UserInfo.get("email"), "sdfad");
   console.log(UserInfo.get("password"), "sdfad");

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(UserInfo),
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
