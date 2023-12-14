import React from 'react';
import { Input } from '../../../components/Input/input';
import { FormButton } from '../../../components/Buttons/formButton';
import { FormComponent } from '../../../components/Form/form';
import { usePostTask } from '../../../api/hooks/tasks/usePostTask';
import useTasksStore from '../../../utils/taskStore';
import { nanoid } from 'nanoid';
import { useGetAuthenticadedUser } from '../../../api/hooks/users/useGetAuthenticadedUser';

interface FormProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Form: React.FC<FormProps> = ({ inputRef }) => {
  const { data: loggedUser } = useGetAuthenticadedUser();
  const { mutate: postTask } = usePostTask();
  const { newTaskContent, setNewTaskContent, addTask } = useTasksStore();

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmNewsTaskContent = newTaskContent.trim();

    if (!trimmNewsTaskContent) {
      return;
    }

    if (!loggedUser) {
      addTask({
        _id: nanoid(),
        content: trimmNewsTaskContent,
        done: false,
      });
      setNewTaskContent('');
    } else {
      postTask({ content: trimmNewsTaskContent, done: false });
      setNewTaskContent('');
    }

    inputRef.current?.focus();
  };

  return (
    <FormComponent onSubmit={onFormSubmit}>
      {loggedUser && (
        <Input
          className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
          ref={inputRef}
          value={newTaskContent}
          placeholder='What have to be done?'
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setNewTaskContent(target.value)
          }
        />
      )}
      {!loggedUser && (
        <Input
          className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
          ref={inputRef}
          value={newTaskContent}
          placeholder='What have to be done?'
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setNewTaskContent(target.value)
          }
        />
      )}
      <FormButton className='border-none cursor-pointer p-[10px] w-[100%] md:hover:scale-[1.15] hover:scale-[1.03] dark:bg-sherpaBlue bg-teal text-white'>
        Add task
      </FormButton>
    </FormComponent>
  );
};
