import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tasks } from '../../types/task';
import { useGetAuthenticadedUser } from '../users/useGetAuthenticadedUser';
import { useGetTaskById } from './useGetTaskById';

const markTaskAsDone = async (_id?: string) => {
  await axiosInstance.patch<Tasks>(
    `${apiConfig.updateTaskStatus.endpoint}${_id}`,
    {
      done: true,
    },
  );
};

export const useMarkTaskAsDone = (_id?: string) => {
  const queryClient = useQueryClient();
  const getAuthenticadedUser = useGetAuthenticadedUser();
  const getTaskById = useGetTaskById(_id);

  return useMutation({
    mutationFn: (_id: string) => markTaskAsDone(_id),
    onSuccess: () => {
      getAuthenticadedUser.refetch();
      getTaskById.refetch();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['taskById'] });
    },
    networkMode: 'offlineFirst',
  });
};
