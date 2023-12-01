import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteTask = async (_id: string | undefined) => {
  await axiosInstance.delete(`${apiConfig.deleteTask.endpoint}` + _id);
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | undefined, unknown>({
    mutationFn: (_id) => deleteTask(_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
