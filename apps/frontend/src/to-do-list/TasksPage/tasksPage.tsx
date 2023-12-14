import { useEffect, useRef } from 'react';
import { Container } from '../../components/Container/container';
import { Header } from '../../components/Header/header';
import { Section } from '../../components/Section/section';
import { ExampleTasksButton } from '../../components/Buttons/exampleTasksButton';
import { Form } from './Form/form';
import { Seach } from './Search/search';
import { TasksList } from './TasksList/tasksList';
import { TaskButtons } from '../../components/Buttons/taskButtons';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';

export const TasksPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { data: loggedUser } = useGetAuthenticadedUser();

  return (
    <Container>
      <Header title='Tasks list' />
      {loggedUser ? (
        <>
          <Section
            title='Add new task'
            body={<Form inputRef={inputRef} />}
            extraHeaderContent={<ExampleTasksButton />}
          />
          <Section
            title='Search'
            body={<Seach />}
          />
          <Section
            title='Tasks list'
            body={<TasksList />}
            extraHeaderContent={<TaskButtons />}
          />
        </>
      ) : (
        <>
          <Section
            title='Add new task'
            body={<Form inputRef={inputRef} />}
            extraHeaderContent={<ExampleTasksButton />}
          />
          <Section
            title='Search'
            body={<Seach />}
          />
          <Section
            title='Tasks list'
            body={<TasksList />}
            extraHeaderContent={<TaskButtons />}
          />
        </>
      )}
    </Container>
  );
};
