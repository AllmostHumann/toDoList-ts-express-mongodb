import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import useTasksStore from '../../../utils/taskStore';
import { Input } from '../../../components/Input/input';

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
    <form
      className='flex flex-wrap mb-[10px] bg-white p-[20px] md:grid md:grid-cols-2 gap-[20px]'
      onSubmit={onFormSubmit}
    >
      <Input
        ref={inputRef}
        value={newTaskContent}
        placeholder='What have to be done?'
        onChange={({
          target,
        }: React.ChangeEvent<HTMLInputElement>) =>
          setNewTaskContent(target.value)
        }
      />
      <button className='text-white bg-teal border-none cursor-pointer p-[10px] ease-[1s] w-[100%] md:hover:scale-[1.15] hover:scale-[1.03]'>
        Add task
      </button>
    </form>
  );
};
