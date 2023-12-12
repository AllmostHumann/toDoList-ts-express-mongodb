import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

const userLogout = async () => {
  const response = await axiosInstance.post<User>(
    `${apiConfig.userLogout.endpoint}`,
  );
  console.log(response.data);
  return response.data;
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => queryClient.removeQueries({ queryKey: ['users'] }),
    networkMode: 'offlineFirst',
  });
};
