import axios from 'axios';

const axiosConfig = () => {
  const token = localStorage.getItem('jwtToken');

  // Helper functions
  const instance = axios.create({
    // baseURL:   'https://' + window.location.host + '/api',
    baseURL: 'http://localhost:5001/api',
    headers: { authorization: token },
  });
  return instance;
};
export default axiosConfig;
