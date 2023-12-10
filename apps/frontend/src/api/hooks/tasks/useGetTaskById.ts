import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { useQuery } from '@tanstack/react-query';
import { Task } from '../../types/task';

const getTaskById = async (_id: string | undefined) => {
  const response = await axiosInstance.get<Task>(
    `${apiConfig.getTaskById.endpoint}${_id}`,
  );
  return response.data;
};

export const useGetTaskById = (_id: string | undefined) => {
  return useQuery({
    queryKey: ['taskById', _id],
    queryFn: () => getTaskById(_id),
    networkMode: 'offlineFirst',
    enabled: !!useGetTaskById,
  });
};
