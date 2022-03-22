import axios from 'axios';
import { environment } from '../config/environment';

const http = axios.create({
  baseURL: environment.backendUrl,
  headers: {
    Authorization: 'JWT ',
    'access-control-allow-origin': '*',
    'content-Type': 'application/json'
  }
});

http.interceptors.request.use(async request => {
  request.headers['Authorization'] = 'JWT';
  return request;
});

export default http;
