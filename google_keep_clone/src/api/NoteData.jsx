import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'



export const getData = async (id) => {
  const url = `notes/userId/${id}`;

  try {
    const response = await fetch(url);

    if (response.status === 204) {
      toast.warn('Create A Note', {
        autoClose: 3000,
      });
      return [];
    }

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
  const userData = localStorage.getItem('userData');
  const user = JSON.parse(userData);
  const id = user?.userId;

  useEffect(() => {
    if (id) {
      getData(id)
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id, setData]);

}

NoteData.propTypes = {
  setData: PropTypes.func,
};
