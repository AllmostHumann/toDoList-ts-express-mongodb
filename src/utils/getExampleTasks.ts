import axios from 'axios';

export const getExampleTasks = async () => {
  const response = await axios.get(
    '/todolist-ts-express-mongodb/exampleTasks.json',
  );
  if (response.statusText !== 'OK') {
    new Error(response.statusText);
  }
  return response.data;
};
