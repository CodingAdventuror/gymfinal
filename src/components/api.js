import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://gymfinal-1.onrender.com/api' : 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
