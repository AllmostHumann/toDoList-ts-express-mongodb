import { Button } from './button';
import useTasksStore from '../../utils/taskStore';

export const ExampleTasksButton = () => {
  const { loading, getExampleTasks } = useTasksStore();

  return (
    <Button
      onClick={() => getExampleTasks()}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Get example tasks'}
    </Button>
  );
};
