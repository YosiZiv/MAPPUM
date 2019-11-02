import axios from 'axios';

const axiosConfig = () => {
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');
  const test = adminToken ? adminToken : userToken ? userToken : null;
  // Helper functions
  const instance = axios.create({
    // baseURL:   'https://' + window.location.host + '/api',
    baseURL: 'http://localhost:5001/api',
    headers: { authorization: test },
  });
  return instance;
};
export default axiosConfig;
