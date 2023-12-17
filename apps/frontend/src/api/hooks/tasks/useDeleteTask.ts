import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../types/task';

const deleteTask = async (_id: string | undefined) => {
  await axiosInstance.delete<Task>(
    `${apiConfig.updateTaskStatus.endpoint}${_id}`,
  );
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    networkMode: 'offlineFirst',
  });
};
