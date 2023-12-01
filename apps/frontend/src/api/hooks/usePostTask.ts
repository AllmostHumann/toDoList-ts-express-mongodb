import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { TaskResult } from '../types/task';
import { useMutation } from '@tanstack/react-query';

export const postTask = async (task: TaskResult) => {
  await axiosInstance.post(`${apiConfig.postTask.endpoint}`, task);
};

export const usePostTask = () =>
  useMutation<void, Error, TaskResult, unknown>({
    mutationFn: (task) => postTask(task),
  });
