import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TasksResponse } from '../types/task';
import { useQuery } from '@tanstack/react-query';

const getExampleTasks = async (query: string | null) => {
  if (query) {
    const response = await axiosInstance.get<TasksResponse>(
      `${apiConfig.getExampleTaskByContent.endpoint}` + query,
    );
    return response.data;
  } else {
    const response = await axiosInstance.get<TasksResponse>(
      `${apiConfig.getExampleTasks.endpoint}`,
    );
    return response.data;
  }
};

export const useGetExampleTasks = (query: string | null) => {
  return useQuery({
    queryKey: ['exampleTasks', query],
    queryFn: () => getExampleTasks(query),
    enabled: !useGetExampleTasks,
  });
};
