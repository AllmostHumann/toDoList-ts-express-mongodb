import useTasksStore from '../../utils/taskStore';
import { Button } from './button';

export const TaskButtons = () => {
  const store = useTasksStore();
  const areAllTasksEmpty = store.areAllTasksEmpty;
  const areAllTaskDone = store.areAllTasksDone;
  const setAllTaskDone = store.setAllDone;
  const setAllTaskHide = store.toggleHideDone;
  const hidden = store.hideDone;

  return (
    <div className='flex flex-wrap basis-auto m-[5px] justify-center'>
      {!!areAllTasksEmpty && (
        <>
          <Button onClick={() => setAllTaskHide()}>
            {hidden ? 'Show' : 'Hide'} done
          </Button>
          <Button
            onClick={() => setAllTaskDone()}
            disabled={!areAllTaskDone}
          >
            Mark all as done
          </Button>
        </>
      )}
    </div>
  );
};
