import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

const userLogout = async () => {
  await axiosInstance.post<User>(`${apiConfig.userLogout.endpoint}`);
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    networkMode: 'offlineFirst',
  });
};
