import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const instance = axios.create({
  baseURL: 'https://maersk-aduanas-backend.azurewebsites.net' //DEV
 /*  baseURL: 'https://maersk-aduanas-backend.azurewebsites.net' //PROD  */
})

export default instance;