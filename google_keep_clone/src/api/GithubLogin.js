export const githubLogin = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/user/auth/github`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
}