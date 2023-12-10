import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { User } from '../../types/user';

const getAuthenticadedUser = async () => {
  const response = await axiosInstance.get<User>(
    `${apiConfig.getAuthenticadedUser.endopoint}`,
  );
  return response.data;
};

export const useGetAuthenticadedUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAuthenticadedUser(),
    networkMode: 'offlineFirst',
    enabled: true,
  });
};
