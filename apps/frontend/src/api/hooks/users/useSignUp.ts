import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

const userSignUp = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  await axiosInstance.post<User>(`${apiConfig.userSignup.endpoint}`, user);
};

export const useUserSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSignUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    networkMode: 'offlineFirst',
  });
};
