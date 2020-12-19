import axios from 'axios'
import {BACKEND_HOST} from './.env';

const HTTP = axios.create({ baseURL: BACKEND_HOST });

export {
    HTTP,
  }