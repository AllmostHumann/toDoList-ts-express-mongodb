import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tasks } from '../../types/task';

const markTaskAsUndone = async (_id?: string) => {
  await axiosInstance.patch<Tasks>(
    `${apiConfig.updateTaskStatus.endpoint}${_id}`,
    {
      done: false,
    },
  );
};

export const useMarkTaskAsUndone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id?: string) => markTaskAsUndone(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['taskById'] });
    },
    networkMode: 'offlineFirst',
  });
};
