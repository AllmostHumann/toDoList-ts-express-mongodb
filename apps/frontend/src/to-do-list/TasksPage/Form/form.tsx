import React from 'react';
import { useState } from 'react';
// import useTasksStore from '../../../utils/taskStore';
import { Input } from '../../../components/Input/input';
import { FormButton } from '../../../components/Buttons/formButton';
import { FormComponent } from '../../../components/Form/form';
import { usePostTask } from '../../../api/hooks/usePostTask';

interface FormProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Form: React.FC<FormProps> = ({ inputRef }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const { mutate: postTask } = usePostTask();

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmNewsTaskContent = newTaskContent.trim();

    if (!trimmNewsTaskContent) {
      return;
    }

    postTask({ content: trimmNewsTaskContent, done: false });

    setNewTaskContent('');
    inputRef.current?.focus();
  };

  return (
    <FormComponent onSubmit={onFormSubmit}>
      <Input
        className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
        ref={inputRef}
        value={newTaskContent}
        placeholder='What have to be done?'
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setNewTaskContent(target.value)
        }
      />
      <FormButton />
    </FormComponent>
  );
};
