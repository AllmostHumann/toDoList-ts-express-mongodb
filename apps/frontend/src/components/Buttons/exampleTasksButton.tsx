import { Button } from './button';
import { useGetExampleTasks } from '../../api/hooks/tasks/useGetExampleTasks';
import { useLocation } from 'react-router-dom';
import searchQueryParamName from '../../utils/searchQueryParamName';

export const ExampleTasksButton = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get(searchQueryParamName);
  const { isLoading, refetch } = useGetExampleTasks(query);

  return (
    <Button
      onClick={() => refetch()}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Get example tasks'}
    </Button>
  );
};
