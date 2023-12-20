import { useQuery } from '@tanstack/react-query';
import { getAllConversations, getConversation } from '../APIs';

export const useGetAllConversations = () => {
  return useQuery({
    queryKey: ['getAllConversations'],
    queryFn: getAllConversations,
  });
};

export const useGetConversation = (params: { page: string; userIds: [string] }) => {
  return useQuery({
    queryKey: ['getConversation'],
    queryFn: () => getConversation(params),
    enabled: !!params?.userIds?.length,
  });
};
