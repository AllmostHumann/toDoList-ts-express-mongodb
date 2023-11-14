import useTasksStore from '../../utils/taskStore';
import { Button } from './button';

export const TaskButtons = () => {
  const store = useTasksStore();
  const tasks = store.tasks;
  const areTasksListEmpty = store.areTasksListEmpty(tasks);
  const areAllTaskDone = store.areAllTasksDone(tasks);
  const setAllTaskDone = store.setAllTasksDone;
  const setAllTaskHide = store.toggleHideDone;
  const hidden = store.hideDone;

  console.log(setAllTaskDone);

  return (
    <div className='flex flex-wrap basis-auto m-[5px] justify-center'>
      {!areTasksListEmpty && (
        <>
          <Button onClick={() => setAllTaskHide()}>
            {hidden ? 'Show' : 'Hide'} done
          </Button>
          <Button onClick={() => setAllTaskDone()}>
            Mark all as {areAllTaskDone ? 'undone' : 'done'}
          </Button>
        </>
      )}
    </div>
  );
};
