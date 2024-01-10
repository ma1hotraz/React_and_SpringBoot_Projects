export default function authHeader() {

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);

    if (user && user.response.token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.response.token
        };

    } else {
        return {
            'Content-Type': 'application/json'
        };
    }
}