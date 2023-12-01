import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TasksResponse } from '../types/task';
import { useQuery } from '@tanstack/react-query';

export const getTaskById = async (_id: TasksResponse) => {
  const response = await axiosInstance.get<TasksResponse>(
    `${apiConfig.getTaskId.endpoint}` + _id,
  );
  return response.data;
};

export const useGetTaskById = (_id: TasksResponse) =>
  useQuery({
    queryKey: ['taskById', _id],
    queryFn: () => getTaskById(_id),
    enabled: false,
  });
