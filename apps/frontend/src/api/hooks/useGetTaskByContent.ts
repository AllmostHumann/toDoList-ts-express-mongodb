import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TasksResponse } from '../types/task';
import { useQuery } from '@tanstack/react-query';
import { useGetTasks } from './useGetTasks';

export const getTaskByContent = async (query: string | null) => {
  const response = await axiosInstance.get<TasksResponse>(
    `${apiConfig.getTaskContent.endpoint}` + query,
  );
  return response.data;
};

export const useGetTaskByContent = (query: string | null) => {
  const { data: tasks } = useGetTasks(query);

  return useQuery({
    queryKey: ['taskByContent', query],
    queryFn: () => getTaskByContent(query),
    enabled: !!tasks,
  });
};
