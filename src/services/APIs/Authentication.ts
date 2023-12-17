import axios from "axios";
import { API } from ".";

export const login = (body: { email: string; password: string }) => {
  return axios.post(`${API}/login`, body).then((res) => res.data);
};

export const register = (body: {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  profileImage?: string;
}) => {
  return axios.post(`${API}/register`, body).then((res) => res.data);
};
