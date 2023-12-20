import { useQueryClient } from '@tanstack/react-query';

export const GetInvalidateQueries = () => {
  const queryClient = useQueryClient();
  return {
    invalidateGetUsersQuery: () =>
      queryClient.invalidateQueries({
        queryKey: ['getUsers'],
      }),
    invalidateGetAllConversations: () =>
      queryClient.invalidateQueries({
        queryKey: ['getAllConversations'],
      }),
    invalidateGetConversation: () =>
      queryClient.invalidateQueries({
        queryKey: ['getConversation'],
      }),
  };
};
