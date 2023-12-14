import { NavLink } from 'react-router-dom';
import { toTask } from '../../../routers';
import { DoneButton } from '../../../components/Buttons/doneButton';
import { DeleteButton } from '../../../components/Buttons/deleteButton';
import { Content } from '../../../components/Content/content';
import searchQueryParamName from '../../../utils/searchQueryParamName';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useGetTasks } from '../../../api/hooks/tasks/useGetTasks';
import { useDeleteTask } from '../../../api/hooks/tasks/useDeleteTask';
import { useMarkTaskAsDone } from '../../../api/hooks/tasks/useMarkTaskAsDone';
import { useMarkTaskAsUndone } from '../../../api/hooks/tasks/useMarkTaskAsUndone';
import DeleteIcon from '../../../components/Buttons/ButtonIcons/deleteButton.svg?react';
import useTasksStore from '../../../utils/taskStore';
import { useGetAuthenticadedUser } from '../../../api/hooks/users/useGetAuthenticadedUser';

export const TasksList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get(searchQueryParamName);
  const { data: tasks } = useGetTasks(query);
  const { data: loggedUser } = useGetAuthenticadedUser();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: markTaskAsDone } = useMarkTaskAsDone();
  const { mutate: markTaskAsUndone } = useMarkTaskAsUndone();
  const {
    removeTask,
    setTaskDone,
    hidden,
    tasks: exampleTask,
    getTaskByQuery,
  } = useTasksStore();
  const exampleTasks = getTaskByQuery(query, exampleTask);

  return (
    <ul className='p-[20px] m-auto'>
      {exampleTask && !loggedUser && (
        <>
          {exampleTasks.map((exampleTask) => (
            <li
              className={classNames({
                'border-b-[1px] border-solid border-alto p-[5px] grid grid-cols-3 items-center gap-[10px] dark:border-gray-400':
                  true,
                hidden: exampleTask.done && hidden,
              })}
              key={exampleTask._id}
            >
              <DoneButton
                className={classNames({
                  'w-[25px] h-[25px] border-none cursor:pointer p-0  text-white':
                    true,
                  ' bg-limeade hover:bg-japaneseLaurel dark:bg-green-700 ':
                    exampleTask.done === false,
                  ' bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 ':
                    exampleTask.done === true,
                })}
                onClick={() => setTaskDone(exampleTask._id)}
              >
                <p className='m-auto translate-y-[1px] hover:translate-y-[-0.5px]'>
                  {exampleTask.done ? 'X' : '✔'}
                </p>
              </DoneButton>
              <Content done={exampleTask.done}>
                <NavLink to={toTask({ _id: exampleTask._id })}>
                  {exampleTask.content}
                </NavLink>
              </Content>
              <DeleteButton onClick={() => removeTask(exampleTask._id)}>
                <DeleteIcon className='m-[3px] w-fit h-fit' />
              </DeleteButton>
            </li>
          ))}
        </>
      )}
      {tasks && loggedUser && (
        <>
          {tasks.map((task) => (
            <li
              className={classNames({
                'border-b-[1px] border-solid border-alto p-[5px] grid grid-cols-3 items-center gap-[10px] dark:border-gray-400':
                  true,
                hidden: task.done && hidden,
              })}
              key={task._id}
            >
              <DoneButton
                className={classNames({
                  'w-[25px] h-[25px] border-none cursor:pointer p-0  text-white':
                    true,
                  ' bg-limeade hover:bg-japaneseLaurel dark:bg-green-700 ':
                    task.done === false,
                  ' bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 ':
                    task.done === true,
                })}
                onClick={() => {
                  task.done === false
                    ? markTaskAsDone(task._id)
                    : markTaskAsUndone(task._id);
                }}
              >
                <p className='m-auto translate-y-[1px] hover:translate-y-[-0.5px]'>
                  {task.done ? 'X' : '✔'}
                </p>
              </DoneButton>
              <Content done={task.done}>
                <NavLink to={toTask({ _id: task._id })}>{task.content}</NavLink>
              </Content>
              <DeleteButton onClick={() => deleteTask(task._id)}>
                <DeleteIcon className='m-[3px] w-fit h-fit' />
              </DeleteButton>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
