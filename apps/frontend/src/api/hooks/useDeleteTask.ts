import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TaskResult } from '../types/task';
import { useMutation } from '@tanstack/react-query';

export const deleteTask = async (_id: TaskResult) => {
  await axiosInstance.delete(`${apiConfig.deleteTask.endpoint}` + _id);
};

export const useDeleteTask = () =>
  useMutation<void, Error, TaskResult, unknown>({
    mutationFn: (_id) => deleteTask(_id),
  });
