import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

export const getAuthenticadedUser = async () => {
  const response = await axiosInstance.get<User>(
    `${apiConfig.getAuthenticadedUser.endopoint}`,
  );
  return response.data;
};

export const useGetAuthenticadedUser = (enabled = false) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAuthenticadedUser,
    networkMode: 'offlineFirst',
    enabled: enabled,
  });
};
