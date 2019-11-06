import axios from 'axios';

const axiosConfig = () => {
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');
  const token = adminToken ? adminToken : userToken ? userToken : null;
  // Helper functions
  const instance = axios.create({
    // baseURL:   'https://' + window.location.host + '/api',
    baseURL: 'http://localhost:5001/api',
    headers: { authorization: token },
  });
  return instance;
};
export default axiosConfig;
