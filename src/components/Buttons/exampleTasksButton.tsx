import { Button } from './button';
import useTasksStore from '../../utils/taskStore';

export const ExampleTasksButton = () => {
  const store = useTasksStore();
  const loading = store.loading;
  const exampleTasks = store.exampleTasks;

  return (
    <Button
      onClick={() => exampleTasks()}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Get example tasks'}
    </Button>
  );
};
