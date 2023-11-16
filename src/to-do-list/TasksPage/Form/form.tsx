import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import useTasksStore from '../../../utils/taskStore';
import { Input } from '../../../components/Input/input';
import { FormButton } from '../../../components/Buttons/formButton';
import { FormComponent } from '../../../components/Form/form';

interface FormProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Form: React.FC<FormProps> = ({ inputRef }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const store = useTasksStore();

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmNewsTaskContent = newTaskContent.trim();

    if (!trimmNewsTaskContent) {
      return;
    }

    store.addTask({
      content: trimmNewsTaskContent,
      id: nanoid(),
      done: false,
    });

    setNewTaskContent('');
    inputRef.current?.focus();
  };

  return (
    <FormComponent onSubmit={onFormSubmit}>
      <Input
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
