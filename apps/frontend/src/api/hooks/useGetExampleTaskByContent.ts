import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TasksResponse } from '../types/task';
import { useQuery } from '@tanstack/react-query';
import { useExampleTasks } from './useExampleTasks';

export const getExampleTaskByContent = async (query: string | null) => {
  const response = await axiosInstance.get<TasksResponse>(
    `${apiConfig.getExampleTaskByContent.endpoint}` + query,
  );
  return response.data;
};

export const useGetExampleTaskByContent = (query: string | null) => {
  const { data: exampleTasks } = useExampleTasks(query);

  return useQuery({
    queryKey: ['exampleTaskByContent', query],
    queryFn: () => getExampleTaskByContent(query),
    enabled: !!exampleTasks,
  });
};
