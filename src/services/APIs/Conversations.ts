import { API } from "./index";
import axios from "axios";

export const getAllConversations = async () =>
  axios.get(`${API}/conversations`).then((res) => res.data);

export const getConversation = async (params: {
  page: string;
  conversationId: string;
}) =>
  axios
    .get(
      `${API}/conversation?conversationId=${params.conversationId}&page=${params.page}`
    )
    .then((res) => res.data);
