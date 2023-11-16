import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'



export const getData = async (id, token) => {

  const url = `notes/userId/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
    });

    // if (response.status === 204) {
    //   toast.warn('Create A Note', {
    //     autoClose: 3000,
    //   });
    //   return [];
    // }

    if (!response.ok) {
      toast.warn('Server Error !', {
        autoClose: 3000,
      });
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {

      const data = await response.json();

      return data !== null ? data : [];

    }
    else {
      throw new Error('Response is not valid JSON');
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
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
    }
  }, [id, token, setData]);

}

NoteData.propTypes = {
  setData: PropTypes.func,
};
