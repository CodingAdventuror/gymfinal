import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://your-render-app-url/api' : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
