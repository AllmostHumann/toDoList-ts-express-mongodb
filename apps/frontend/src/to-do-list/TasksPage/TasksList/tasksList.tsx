import { NavLink } from 'react-router-dom';
import { toTask } from '../../../routers';
import { DoneButton } from '../../../components/Buttons/doneButton';
import { DeleteButton } from '../../../components/Buttons/deleteButton';
import { Content } from '../../../components/Content/content';
import searchQueryParamName from '../../../utils/searchQueryParamName';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useGetTasks } from '../../../api/hooks/useGetTasks';
import { useDeleteTask } from '../../../api/hooks/useDeleteTask';
import { useMarkTaskAsDone } from '../../../api/hooks/useMarkTaskAsDone';
import { useMarkTaskAsUndone } from '../../../api/hooks/useMarkTaskAsUndone';
import useTasksStore from '../../../utils/taskStore';
// import { useEffect } from 'react';

export const TasksList = () => {
  const store = useTasksStore();
  const location = useLocation();
  // const { setTasks } = useTasksStore();
  const query = new URLSearchParams(location.search).get(searchQueryParamName);
  const { data: tasks } = useGetTasks(query);
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: markTaskAsDone } = useMarkTaskAsDone();
  const { mutate: markTaskAsUndone } = useMarkTaskAsUndone();
  const hideDone = store.hideDone;

  // useEffect(() => {
  //   if (tasks) {
  //     setTasks(tasks);
  //   }
  // }, [setTasks, tasks]);

  return (
    <ul className='p-[20px] m-auto'>
      {tasks?.map((task) => (
        <li
          className={classNames({
            'border-b-[1px] border-solid border-alto p-[5px] grid grid-cols-3 items-center gap-[10px] dark:border-gray-400':
              true,
            hidden: task.done && hideDone,
          })}
          key={task._id}
        >
          <DoneButton
            onClick={() => {
              task.done === false
                ? markTaskAsDone(task._id)
                : markTaskAsUndone(task._id);
            }}
          >
            <p className='m-auto translate-y-[1px] hover:translate-y-[-0.5px]'>
              {task.done ? '✔' : '✔'}
            </p>
          </DoneButton>
          <Content done={task.done}>
            <NavLink to={toTask({ _id: task._id })}>{task.content}</NavLink>
          </Content>
          <DeleteButton onClick={() => deleteTask(task._id)}>
            <p className='m-auto translate-y-[1px] hover:translate-y-[-0.5px]'>
              X
            </p>
          </DeleteButton>
        </li>
      ))}
    </ul>
  );
};
