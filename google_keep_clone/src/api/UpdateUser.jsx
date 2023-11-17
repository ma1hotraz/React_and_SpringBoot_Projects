
export const updateData = async (updatedData) => {
    const url = 'user/updateUser/';

    const formData = new FormData();

    const jsonDataBlob = new Blob([JSON.stringify(updatedData)], { type: 'application/json' });
    formData.append('jsonField', jsonDataBlob);

    formData.append('email', updatedData.email);
    formData.append('name', updatedData.name);
    formData.append('file', updatedData.file);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data !== null) {
                sessionStorage.setItem('userData', JSON.stringify(data));
                return data;
             }
            return data || {};
        } else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
