import { Button } from './button';
import useTasksStore from '../../utils/taskStore';

export const ExampleTasksButton = () => {
  const store = useTasksStore();
  const loading = store.loading;
  const getExampleTasks = store.getExampleTasks;

  return (
    <Button
      onClick={() => getExampleTasks()}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Get example tasks'}
    </Button>
  );
};
