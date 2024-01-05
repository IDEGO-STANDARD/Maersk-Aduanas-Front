import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const excelInstance = axios.create({
  baseURL: 'https://maersk-excel.azurewebsites.net' //DEV
  /* baseURL: 'https://maersk-excel.azurewebsites.net' //PROD  */
})

excelInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default excelInstance;