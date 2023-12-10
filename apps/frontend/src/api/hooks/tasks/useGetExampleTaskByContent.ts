import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utilities/axiosInstance';
import { apiConfig } from '../../config/apiRoutes';
import { Tasks } from '../../types/task';
import { useGetExampleTasks } from './useGetExampleTasks';

const getExampleTaskByContent = async (query: string | null) => {
  const response = await axiosInstance.get<Tasks>(
    `${apiConfig.getExampleTaskByContent.endpoint}` + query,
  );
  return response.data;
};

export const useGetExampleTaskByContent = (query: string | null) => {
  const { data: exampleTasks } = useGetExampleTasks(query);

  return useQuery({
    queryKey: ['exampleTaskByContent', query],
    queryFn: () => getExampleTaskByContent(query),
    networkMode: 'offlineFirst',
    enabled: !!exampleTasks,
  });
};
