import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tasks } from '../../types/task';
import { useGetAuthenticadedUser } from '../users/useGetAuthenticadedUser';
import { useGetTasks } from './useGetTasks';

const markAllTasksAsUndone = async () => {
  await axiosInstance.patch<Tasks>(`${apiConfig.getTasks.endpoint}`, {
    done: false,
  });
};

export const useMarkAllTasksAsUndone = () => {
  const queryClient = useQueryClient();
  const getAuthenticadedUser = useGetAuthenticadedUser();
  const getTask = useGetTasks();

  return useMutation({
    mutationFn: markAllTasksAsUndone,
    onSuccess: () => {
      getAuthenticadedUser.refetch();
      getTask.refetch();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    networkMode: 'offlineFirst',
  });
};
