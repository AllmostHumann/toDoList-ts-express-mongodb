import axios from 'axios';
import { apiBaseUrl } from '../config/apiRoutes';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

export { axiosInstance };
