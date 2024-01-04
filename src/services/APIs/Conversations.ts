import { API } from './index';
import axios from 'axios';

export const getAllConversations = async () => axios.get(`${API}/conversations`).then((res) => res.data);

export const getConversation = async (params: { page: string; userId: string }) =>
  axios.get(`${API}/conversation?page=${params.page}&userId=${params?.userId}`).then((res) => res.data);
