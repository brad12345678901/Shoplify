import axios from "axios";


const API_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({ baseURL: `${API_URL}/api` });