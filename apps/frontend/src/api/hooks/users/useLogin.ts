import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

const userLogin = async (user: { username: string; password: string }) => {
  await axiosInstance.post<User>(`${apiConfig.userLogin.endpoint}`, user);
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    networkMode: 'offlineFirst',
  });
};
