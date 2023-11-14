import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const pythonInstance = axios.create({
  baseURL: 'https://idego-interaccion-correos.azurewebsites.net' //DEV
  /* baseURL: 'https://maersk-aduanas-backend.azurewebsites.net' //PROD  */
})

pythonInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default pythonInstance;