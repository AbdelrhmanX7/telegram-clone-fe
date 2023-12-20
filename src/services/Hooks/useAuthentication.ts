import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register, userSearch } from '../APIs';

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: { email: string; password: string }) => login(body),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
      username: string;
      phoneNumber: string;
      profileImage?: string;
    }) => register(body),
  });
};

export const useUserSearch = (params: { search: string }) => {
  return useQuery({
    queryFn: async () => await userSearch(params),
    staleTime: 1000,
    queryKey: ['getUsers'],
  });
};
