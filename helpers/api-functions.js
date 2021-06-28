import axios from 'axios';
import { API } from "../config";

export const Post = (url, data) => axios.post(`${API}${url}`, data)