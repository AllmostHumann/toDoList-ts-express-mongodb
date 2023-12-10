import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tasks } from '../../types/task';

const markAllTasksAsDone = async () => {
  await axiosInstance.patch<Tasks>(`${apiConfig.getTasks.endpoint}`, {
    done: true,
  });
};

export const useMarkAllTasksAsDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllTasksAsDone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    networkMode: 'offlineFirst',
  });
};
