import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const markTaskAsDone = async (_id: string) => {
  await axiosInstance.patch(`${apiConfig.updateTaskStatus.endpoint}${_id}`, {
    done: true,
  });
};

export const useMarkTaskAsDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markTaskAsDone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    networkMode: 'offlineFirst',
  });
};
