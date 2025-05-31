import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust to your backend base URL
  withCredentials: true, // only if using cookies/sessions
});

export default api;
