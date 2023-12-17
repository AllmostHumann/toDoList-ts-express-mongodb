import axios from 'axios';
import { Tasks } from '../api/types/task';

export const getExampleTasks = async () => {
  const response = await axios.get<Tasks>(
    'https://todolist-ts-mern-frontend-allmosthumann.vercel.app//exampleTasks.json',
  );
  return response.data;
};
