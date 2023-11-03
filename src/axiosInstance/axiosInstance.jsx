import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const instance = axios.create({
  baseURL: 'http://maersk-aduanas-backend.azurewebsites.net' //DEV
  /* baseURL: 'http://maersk-aduanas-backend.azurewebsites.net' //PROD  */
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default instance;