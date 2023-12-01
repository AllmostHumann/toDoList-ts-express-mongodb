import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TasksResponse } from '../types/task';
import { useQuery } from '@tanstack/react-query';

export const getTasks = async (query: string | null) => {
  if (query) {
    const response = await axiosInstance.get<TasksResponse>(
      `${apiConfig.getTaskContent.endpoint}` + query,
    );
    return response.data;
  } else {
    const response = await axiosInstance.get<TasksResponse>(
      `${apiConfig.getTasks.endpoint}`,
    );
    return response.data;
  }
};

export const useGetTasks = (query: string | null) => {
  return useQuery({
    queryKey: ['tasks', query],
    queryFn: () => getTasks(query),
    enabled: true,
  });
};
