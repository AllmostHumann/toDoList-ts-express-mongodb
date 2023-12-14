import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../types/task';
import { useGetAuthenticadedUser } from '../users/useGetAuthenticadedUser';
import { useGetTaskById } from './useGetTaskById';

const updateTaskContent = async (_id?: string, content?: string) => {
  await axiosInstance.patch<Task>(
    `${apiConfig.updateTaskContent.endpoint}${_id}/content`,
    { content },
  );
};

export const useUpdateTaskContent = (_id?: string) => {
  const queryClient = useQueryClient();
  const getAuthenticadedUser = useGetAuthenticadedUser();
  const getTaskById = useGetTaskById(_id);

  return useMutation({
    mutationFn: (content: string) => updateTaskContent(_id, content),
    onSuccess: () => {
      getAuthenticadedUser.refetch();
      getTaskById.refetch();
      queryClient.invalidateQueries({ queryKey: ['taskById', _id] });
    },
    networkMode: 'offlineFirst',
  });
};
