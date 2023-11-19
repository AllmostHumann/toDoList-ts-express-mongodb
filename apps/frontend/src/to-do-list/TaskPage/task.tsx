// import { useParams } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container/container';
import { Header } from '../../components/Header/header';
import { Section } from '../../components/Section/section';
import useTasksStore from '../../utils/taskStore';

export const TaskPage = () => {
  const store = useTasksStore();
  const { id } = useParams();
  const tasks = store.tasks;
  const task = store.getTaskById(id, tasks);
  console.log(id);

  return (
    <Container>
      <Header title='Task details' />
      <Section
        title={task ? task.content : 'Task not found 😔'}
        body={
          task && (
            <div className='p-[20px] bg-white leading-normal mb-[10px] border-[1px] flex flex-wrap'>
              <strong>Done:</strong>&nbsp;
              {task.done ? 'Yes' : 'No'}
            </div>
          )
        }
      />
    </Container>
  );
};
