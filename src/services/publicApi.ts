import axios from 'axios';
import { API_URL } from '@/utils/constants';

export const publicApi = axios.create({ baseURL: API_URL });