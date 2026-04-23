import axios from 'axios';
const api = axios.create({
  baseURL: 'https://json-server-phi-kohl.vercel.app'
});
export default api;
