import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import { serverStatus } from './AdminAPIs';


export const getData = async (id, token) => {

  const url = `notes/userId/${id}`;
  
  try {
    console.log(await serverStatus() !== null ? 'No' : 'Tes');
  if (await serverStatus() !== null) {
    console.log('servre is up');

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {

      const data = await response.json();

      return data !== null ? data : [];

    }

    if (response.status === 204) {
      return [];
    }


    if (!response.ok) {
      toast.warn('Server Error !', {
        autoClose: 3000,
      });
      return [];
    }

  } 
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default function NoteData({ setData }) {
  const userData = sessionStorage.getItem('userData');
  const user = JSON.parse(userData);
  const id = user?.userId;
  const token = user?.response;

  useEffect(() => {
    if (id) {
      getData(id, token)
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      toast.error('Server is offline', 1000);
    }
  }, [id, token, setData]);

}

NoteData.propTypes = {
  setData: PropTypes.func,
};



