
export const getIPinfo = async () => {

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);

    try {
        const apiKey = "https://ipinfo.io/json?token=fffe4ed8db3560";
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const url = `${baseUrl}/user/logInfo`;

        const logIp = await fetch(apiKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const ipInfo = await logIp.json();

        if (logIp.status !== 200) {
            throw Error('Exception Caught');
        }

        const userObj = {
            city: ipInfo.city,
            country: ipInfo.country,
            ipAddress: ipInfo.ip,
            org: ipInfo.org,
            zipCode: ipInfo.postal,
            region: ipInfo.region,
            timeZone: ipInfo.timezone,
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'email': user.email,
            },
            body: JSON.stringify(userObj)
        });

    } catch (e) {
        console.log(e);
        // throw new Error('Unable to log IP');
    }

}