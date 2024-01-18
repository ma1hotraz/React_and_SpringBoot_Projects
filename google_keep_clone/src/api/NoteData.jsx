import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import { serverStatus } from './AdminAPIs';
import { useCallback } from 'react';
import { useEffect } from 'react';
import authHeader from './authHeader';


export const getData = async () => {

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const url = `${baseUrl}/notes/userId/`;

  try {
    if (await serverStatus() !== null) {
      const response = await fetch(url, {
        headers: authHeader()
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data !== null ? data : [];
      }

      if(response.status === 403){
         
      }

      if (response.status === 204) {
        return [];
      }


      if (!response.ok) {
        toast.warn('Server Error !', {
          autoClose: 1000,
        });
        return [];
      }

    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default function NoteData({ setData }) {

  const userData = localStorage.getItem('userData');
  const user = JSON.parse(userData);

  const memoizedSetData = useCallback(
    (data) => {
      // Check if setData is a function before calling it
      // if (typeof setData === 'function') {
      setData(data);
      // } else {
      //   // console.error('setData is not a function');
      // }
    },
    [setData]
  );

  useEffect(() => {
    if (user) {
      getData()
        .then((fetchedData) => {
          memoizedSetData(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      toast.error('Server is offline', 1000);
    }
  }, [memoizedSetData]);
}

NoteData.propTypes = {
  setData: PropTypes.func,
};
