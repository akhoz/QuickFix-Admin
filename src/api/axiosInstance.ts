import axios from 'axios';
import ROUTES from '../constants/routes';

const axiosInstance = axios.create({
  baseURL: ROUTES.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
