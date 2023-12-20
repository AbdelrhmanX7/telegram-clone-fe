import qs from "qs";
import { API } from "./index";
import axios from "axios";

export const getAllConversations = async () =>
  axios.get(`${API}/conversations`).then((res) => res.data);

export const getConversation = async (params: {
  page: string;
  userIds: [string];
}) =>
  axios
    .get(`${API}/conversation?page=${params.page}`, {
      params: {
        userIds: params?.userIds,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    })
    .then((res) => res.data);
