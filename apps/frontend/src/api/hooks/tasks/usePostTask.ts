import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../types/task';

const postTask = async (task: { content: string; done: boolean }) => {
  await axiosInstance.post<Task>(`${apiConfig.postTask.endpoint}`, task);
};

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    networkMode: 'offlineFirst',
  });
};
