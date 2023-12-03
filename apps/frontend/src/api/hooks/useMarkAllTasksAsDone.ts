import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const markAllTasksAsDone = async () => {
  await axiosInstance.patch(`${apiConfig.getTasks.endpoint}`, {
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
  });
};
