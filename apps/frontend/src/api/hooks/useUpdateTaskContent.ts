import { axiosInstance } from '../utilities/axiosInstance';
import { apiConfig } from '../config/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateTaskContent = async (_id: string | undefined, content: string) => {
  await axiosInstance.patch(
    `${apiConfig.updateTaskContent.endpoint}${_id}/content`,
    { content },
  );
};

export const useUpdateTaskContent = (_id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => updateTaskContent(_id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskById', _id] });
    },
    networkMode: 'offlineFirst',
  });
};
