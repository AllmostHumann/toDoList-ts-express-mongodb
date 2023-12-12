import axios from 'axios';
import { apiBaseUrl } from '../config/apiRoutes';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export { axiosInstance };
