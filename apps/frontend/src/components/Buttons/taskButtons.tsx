import { useGetTasks } from '../../api/hooks/tasks/useGetTasks';
import { useMarkAllTasksAsDone } from '../../api/hooks/tasks/useMarkAllTasksAsDone';
import { useMarkAllTasksAsUndone } from '../../api/hooks/tasks/useMarkAllTasksAsUndone';
import useTasksStore from '../../utils/taskStore';
import { Button } from './button';

export const TaskButtons = () => {
  const store = useTasksStore();
  // const tasks = store.tasks;
  // const areTasksListEmpty = store.areTasksListEmpty(tasks);
  // const areAllTaskDone = store.areAllTasksDone(tasks);
  // const hidden = store.hideDone;
  const { data: task } = useGetTasks();
  const { mutate: setAllTaskDone } = useMarkAllTasksAsDone();
  const { mutate: setAllTaskUndone } = useMarkAllTasksAsUndone();
  const setAllTaskHide = store.toggleHideDoneTasks;
  const hidden = task?.every((task) => task.done === false);
  const areTasksListEmpty = task?.every((task) => task.content.length === 0);
  const areAllTaskDone = task?.every((task) => task.done);

  return (
    <div className='flex flex-wrap basis-auto m-[5px] bg-white dark:bg-davysGray justify-center'>
      {!areTasksListEmpty && (
        <>
          <Button onClick={() => setAllTaskHide()}>
            {hidden ? 'Show' : 'Hide'} done
          </Button>
          <Button
            onClick={() => {
              task?.map((task) =>
                task.done === false ? setAllTaskDone() : setAllTaskUndone(),
              );
            }}
          >
            Mark all as {areAllTaskDone ? 'undone' : 'done'}
          </Button>
        </>
      )}
    </div>
  );
};
