import { Button } from './button';
import { useGetTasks } from '../../api/hooks/tasks/useGetTasks';
import { useMarkAllTasksAsDone } from '../../api/hooks/tasks/useMarkAllTasksAsDone';
import { useMarkAllTasksAsUndone } from '../../api/hooks/tasks/useMarkAllTasksAsUndone';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';
import useTasksStore from '../../utils/taskStore';

export const TaskButtons = () => {
  const { data: tasks } = useGetTasks();
  const { data: loggedUser } = useGetAuthenticadedUser();
  const { mutate: setAllTaskDone } = useMarkAllTasksAsDone();
  const { mutate: setAllTaskUndone } = useMarkAllTasksAsUndone();
  const {
    tasks: exampleTasks,
    hidden,
    areTasksListEmpty,
    areAllTasksDone,
    toggleHideDoneTasks,
    setAllTasksDone,
  } = useTasksStore();
  const areAllTasksAreDone = areAllTasksDone(tasks);
  const areAllExampleTasksDone = areAllTasksDone(exampleTasks);
  const areTasksListIsEmpty = areTasksListEmpty(tasks || exampleTasks);

  return (
    <div className='flex flex-wrap basis-auto m-[5px] bg-white dark:bg-davysGray justify-center'>
      {!areTasksListIsEmpty && loggedUser && (
        <>
          <Button onClick={() => toggleHideDoneTasks()}>
            {hidden ? 'Show' : 'Hide'} done
          </Button>
          <Button
            onClick={() => {
              tasks?.map((task) =>
                task.done === false ? setAllTaskDone() : setAllTaskUndone(),
              );
            }}
          >
            Mark all as {areAllTasksAreDone ? 'undone' : 'done'}
          </Button>
        </>
      )}
      {!areTasksListIsEmpty && !loggedUser && (
        <>
          <Button onClick={() => toggleHideDoneTasks()}>
            {hidden ? 'Show' : 'Hide'} done
          </Button>
          <Button onClick={() => setAllTasksDone()}>
            Mark all as {areAllExampleTasksDone ? 'undone' : 'done'}
          </Button>
        </>
      )}
    </div>
  );
};
