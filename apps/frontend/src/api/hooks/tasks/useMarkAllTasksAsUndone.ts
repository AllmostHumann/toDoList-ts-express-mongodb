import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tasks } from '../../types/task';

const markAllTasksAsUndone = async () => {
  await axiosInstance.patch<Tasks>(`${apiConfig.getTasks.endpoint}`, {
    done: false,
  });
};

export const useMarkAllTasksAsUndone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllTasksAsUndone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    networkMode: 'offlineFirst',
  });
};
