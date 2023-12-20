import axios from 'axios';
import { API } from '.';

export const login = async (body: { email: string; password: string }) => {
  return axios.post(`${API}/login`, body).then((res) => res.data);
};

export const register = async (body: {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  profileImage?: string;
}) => {
  return axios.post(`${API}/register`, body).then((res) => res.data);
};

export const userSearch = async (query: { search: string }) => {
  return axios.get(`${API}/get-users?search=${query?.search ?? ''}`).then((res) => res.data);
};
