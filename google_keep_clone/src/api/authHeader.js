export default function authHeader() {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData);

    if (user) {
        return {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + user.response.token
        };

    } else {
        return {};
    }
}