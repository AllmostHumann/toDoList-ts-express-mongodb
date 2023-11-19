import classNames from 'classnames';
import useTasksStore from '../../utils/taskStore';

interface DoneButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DoneButton: React.FC<DoneButtonProps> = ({
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
        'bg-japaneseLaurel hover:bg-limeade hover:border-[1px] hover:border-solid hover:border-black dark:bg-green-900 text-white':
          task,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
