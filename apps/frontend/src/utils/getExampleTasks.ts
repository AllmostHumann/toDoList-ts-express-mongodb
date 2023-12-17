import axios from 'axios';
import { Tasks } from '../api/types/task';

export const getExampleTasks = async () => {
  const response = await axios.get<Tasks>(
    '/todolist-ts-express-mongodb/apps/frontend/src/utils/exampleTasks.json',
  );
  return response.data;
};
