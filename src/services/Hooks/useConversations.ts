import { useQuery } from "@tanstack/react-query";
import { getAllConversations, getConversation } from "../APIs";

export const useGetAllConversations = () => {
  return useQuery({
    queryKey: ["getAllConversations"],
    queryFn: getAllConversations,
  });
};

export const useGetConversation = (params: {
  page: string;
  conversationId: string;
}) => {
  return useQuery({
    queryKey: ["getConversation"],
    queryFn: () => getConversation(params),
  });
};
