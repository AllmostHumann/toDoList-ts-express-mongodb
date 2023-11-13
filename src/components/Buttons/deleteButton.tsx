import classNames from 'classnames';
import useTasksStore from '../../utils/taskStore';

interface DeleteButtonProps {
  children: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
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
        'text-white w-[25px] h-[25px] border-none cursor:pointer p-0 transition-none':
          true,
        'bg-red-600 hover:bg-sunsetOrange hover:border-[2px] hover:border-solid hover:border-black':
          task,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
