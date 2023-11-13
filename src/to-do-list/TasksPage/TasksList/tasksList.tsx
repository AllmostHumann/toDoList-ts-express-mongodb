import { useLocation } from 'react-router-dom';
import useTasksStore from '../../../utils/taskStore';
import searchQueryParamName from '../../../utils/searchQueryParamName';
import { NavLink } from 'react-router-dom';
import { toTask } from '../../../routers';
import classNames from 'classnames';
import { DoneButton } from '../../../components/Buttons/doneButton';
import { DeleteButton } from '../../../components/Buttons/deleteButton';

interface TaskListContent {
  hidden?: boolean;
}

export const TasksList: React.FC<TaskListContent> = ({
  hidden,
}) => {
  const store = useTasksStore();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get(
    searchQueryParamName,
  );
  const task = store.tasks;
  const tasks = store.selectTaskByQuery(query, task);
  const hideDone = store.hideDone;
  const removeTask = store.removeTask;
  const toggleTaskDone = store.toggleTaskDone;

  return (
    <ul className='p-[20px] m-auto bg-white'>
      {tasks.map((task) => (
        <li
          className={classNames({
            'border-b-[1px] border-solid border-alto p-[5px] grid grid-cols-3 items-center gap-[10px]':
              true,
            hidden,
          })}
          key={task.id}
          hidden={task.done && hideDone}
        >
          <DoneButton onClick={() => toggleTaskDone}>
            {task.done ? '✔' : ''}
          </DoneButton>
          <NavLink to={toTask({ id: task.id })}>
            {task.content}
          </NavLink>
          <DeleteButton onClick={() => removeTask}>
            🗑
          </DeleteButton>
        </li>
      ))}
    </ul>
  );
};
