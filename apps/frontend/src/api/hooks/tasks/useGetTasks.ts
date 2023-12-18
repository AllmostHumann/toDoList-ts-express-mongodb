import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { Tasks } from '../../types/task';
import { useGetAuthenticadedUser } from '../users/useGetAuthenticadedUser';

const getTasks = async (query?: string | null) => {
  if (query) {
    const response = await axiosInstance.get<Tasks>(
      `${apiConfig.getTaskByContent.endpoint}` + query,
    );
    return response.data;
  } else if (!query) {
    const response = await axiosInstance.get<Tasks>(
      `${apiConfig.getTasks.endpoint}`,
    );
    return response.data;
  }
};

export const useGetTasks = (query?: string | null) => {
  const { data } = useGetAuthenticadedUser();

  return useQuery({
    queryKey: ['tasks', query],
    queryFn: () => getTasks(query),
    networkMode: 'offlineFirst',
    enabled: !!data,
  });
};
