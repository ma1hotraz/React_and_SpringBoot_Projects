

const checkTokenStatus = () => {
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);
    const token = user?.response;
    console.log(token);
}