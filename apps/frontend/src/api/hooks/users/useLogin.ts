import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';
import { useGetAuthenticadedUser } from './useGetAuthenticadedUser';

export const userLogin = async (user: {
  username: string;
  password: string;
}) => {
  await axiosInstance.post<User>(`${apiConfig.userLogin.endpoint}`, user);
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const getAuthenticadedUser = useGetAuthenticadedUser(false);

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'tasks'] }),
        getAuthenticadedUser.refetch();
    },
    networkMode: 'offlineFirst',
  });
};
