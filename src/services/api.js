import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3333'
  baseURL: 'https://inventorycontrol-macstoree-a61f8c02174a.herokuapp.com'
})