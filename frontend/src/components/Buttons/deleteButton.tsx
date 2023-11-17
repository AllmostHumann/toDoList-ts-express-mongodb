import classNames from 'classnames';
import useTasksStore from '../../utils/taskStore';

interface DeleteButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  children,
}) => {
  const store = useTasksStore();
  const task = store.tasks;

  return (
    <button
      className={classNames({
        'w-[25px] h-[25px] border-none cursor:pointer p-0 transition-none':
          true,
        'bg-red-600 hover:bg-sunsetOrange hover:border-[1px] hover:border-solid hover:border-black dark:bg-red-900 text-white':
          task,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
