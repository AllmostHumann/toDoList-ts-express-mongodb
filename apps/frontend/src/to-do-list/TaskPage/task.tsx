import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container/container';
import { Header } from '../../components/Header/header';
import { Section } from '../../components/Section/section';
import { useGetTaskById } from '../../api/hooks/useGetTaskById';

export const TaskPage = () => {
  const { _id } = useParams();
  const { data: task } = useGetTaskById(_id);

  return (
    <Container>
      <Header title='Task details' />
      <Section
        title={task ? task.content : 'Task not found 😔'}
        body={
          task && (
            <div className='p-[20px] bg-white dark:text-alto dark:bg-davysGray leading-normal mb-[10px]  flex flex-wrap rounded-[5px]'>
              <strong>Done:</strong>&nbsp;
              {task.done ? 'Yes' : 'No'}
            </div>
          )
        }
      />
    </Container>
  );
};
