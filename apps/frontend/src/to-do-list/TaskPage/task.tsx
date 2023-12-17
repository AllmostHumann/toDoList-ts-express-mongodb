import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container/container';
import { Header } from '../../components/Header/header';
import { Section } from '../../components/Section/section';
import { useGetTaskById } from '../../api/hooks/tasks/useGetTaskById';
import { EditButton } from '../../components/Buttons/editButton';
import EditIcon from '../../components/Buttons/ButtonIcons/editButton.svg?react';
import { useUpdateTaskContent } from '../../api/hooks/tasks/useUpdateTaskContent';
import { useEffect, useRef } from 'react';
import { Input } from '../../components/Input/input';
import { DoneButton } from '../../components/Buttons/doneButton';
import { useMarkTaskAsDone } from '../../api/hooks/tasks/useMarkTaskAsDone';
import { useMarkTaskAsUndone } from '../../api/hooks/tasks/useMarkTaskAsUndone';
import classNames from 'classnames';
import useTasksStore from '../../utils/taskStore';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';

export const TaskPage = () => {
  const { _id } = useParams();
  const { data: loggedUser } = useGetAuthenticadedUser();
  const { mutate: updateTaskContent } = useUpdateTaskContent(_id);
  const { mutate: markTaskAsDone } = useMarkTaskAsDone(_id);
  const { mutate: markTaskAsUndone } = useMarkTaskAsUndone(_id);
  const { data: task } = useGetTaskById(_id);
  const {
    newTaskContent,
    setNewTaskContent,
    edit,
    setEdit,
    tasks: exampleTasks,
    getTaskById,
    setTaskDone,
    updateTaskContent: updateExampleTaskContent,
  } = useTasksStore();
  const exampleTask = getTaskById(_id, exampleTasks);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmNewsTaskContent = newTaskContent.trim();

    if (!trimmNewsTaskContent) {
      return;
    } else if (trimmNewsTaskContent) {
      setEdit(false);
    }

    if (loggedUser) {
      updateTaskContent(trimmNewsTaskContent);
    } else {
      updateExampleTaskContent(exampleTask!._id, trimmNewsTaskContent);
    }
    setNewTaskContent('');
  };

  return (
    <Container>
      <Header title='Task details' />
      {loggedUser && task && (
        <Section
          title={
            task && (
              <div className='grid grid-cols-2 justify-between bg-white dark:text-alto dark:bg-davysGray'>
                <div className=' bg-white dark:text-alto dark:bg-davysGray leading-normal flex flex-wrap rounded-[5px]'>
                  <strong>Task status:</strong>&nbsp;
                  {task.done ? 'Done😁' : 'Undone😔'}
                </div>
                <DoneButton
                  className={classNames({
                    'w-[30px] h-[30px] border-none cursor:pointer mt-1 grid place-content-center p-0  text-white':
                      true,
                    ' bg-limeade hover:bg-japaneseLaurel dark:bg-green-700 dark:hover:bg-green-600':
                      task.done === true,
                    ' bg-orange-400 hover:bg-orange-500 dark:bg-orange-700 ':
                      task.done === false,
                  })}
                  onClick={() => {
                    task.done === false
                      ? markTaskAsDone(task._id)
                      : markTaskAsUndone(task._id);
                  }}
                >
                  <p className='m-auto translate-y-[1px] '>
                    {task.done ? '✔' : 'X'}
                  </p>
                </DoneButton>
              </div>
            )
          }
          body={
            task && (
              <div className='flex flex-row justify-between p-[20px] bg-white dark:text-alto dark:bg-davysGray mb-[10px] rounded-[5px]'>
                <div className=' bg-white dark:text-alto dark:bg-davysGray leading-normal place-content-center flex flex-wrap '>
                  <strong>Task content:</strong>&nbsp;
                  {edit ? (
                    <form onSubmit={onFormSubmit}>
                      <Input
                        className='inline-block outline-none text-black pl-[5px]'
                        ref={inputRef}
                        value={newTaskContent}
                        placeholder={task.content}
                        onChange={({
                          target,
                        }: React.ChangeEvent<HTMLInputElement>) =>
                          setNewTaskContent(target.value)
                        }
                      />
                    </form>
                  ) : (
                    <>{task ? task.content : 'Task not found 😔'}</>
                  )}
                </div>
                <EditButton
                  onClick={() => {
                    !edit ? setEdit(true) : setEdit(false);
                  }}
                >
                  <EditIcon className='p-1' />
                </EditButton>
              </div>
            )
          }
        />
      )}
      {!loggedUser && exampleTask && (
        <>
          <Section
            title={
              exampleTask && (
                <div className='grid grid-cols-2 justify-between bg-white dark:text-alto dark:bg-davysGray'>
                  <div className=' bg-white dark:text-alto dark:bg-davysGray leading-normal flex flex-wrap rounded-[5px]'>
                    <strong>Task status:</strong>&nbsp;
                    {exampleTask.done ? 'Done😁' : 'Undone😔'}
                  </div>
                  <DoneButton
                    className={classNames({
                      'w-[30px] h-[30px] border-none cursor:pointer mt-1 grid place-content-center p-0  text-white':
                        true,
                      ' bg-limeade hover:bg-japaneseLaurel dark:bg-green-700 dark:hover:bg-green-600':
                        exampleTask.done === true,
                      ' bg-orange-400 hover:bg-orange-500 dark:bg-orange-700 ':
                        exampleTask.done === false,
                    })}
                    onClick={() => {
                      exampleTask.done === false
                        ? setTaskDone(exampleTask._id)
                        : setTaskDone(exampleTask._id);
                    }}
                  >
                    <p className='m-auto translate-y-[1px] '>
                      {exampleTask.done ? '✔' : 'X'}
                    </p>
                  </DoneButton>
                </div>
              )
            }
            body={
              exampleTask && (
                <div className='flex flex-row justify-between p-[20px] bg-white dark:text-alto dark:bg-davysGray mb-[10px] rounded-[5px]'>
                  <div className=' bg-white dark:text-alto dark:bg-davysGray leading-normal place-content-center flex flex-wrap '>
                    <strong>Task content:</strong>&nbsp;
                    {edit ? (
                      <form onSubmit={onFormSubmit}>
                        <Input
                          className='inline-block outline-none text-black pl-[5px]'
                          ref={inputRef}
                          value={newTaskContent}
                          placeholder={exampleTask.content}
                          onChange={({
                            target,
                          }: React.ChangeEvent<HTMLInputElement>) =>
                            setNewTaskContent(target.value)
                          }
                        />
                      </form>
                    ) : (
                      <>
                        {exampleTask
                          ? exampleTask.content
                          : 'Task not found 😔'}
                      </>
                    )}
                  </div>
                  <EditButton
                    onClick={() => {
                      !edit ? setEdit(true) : setEdit(false);
                    }}
                  >
                    <EditIcon className='p-1' />
                  </EditButton>
                </div>
              )
            }
          />
          ;
        </>
      )}
    </Container>
  );
};
