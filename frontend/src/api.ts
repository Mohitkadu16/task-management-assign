import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // This should be from env vars in prod
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
