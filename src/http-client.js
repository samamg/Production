import axios from 'axios';
const api = axios.create({
  baseURL: 'https://json-serverapi.vercel.app'
});
export default api;
