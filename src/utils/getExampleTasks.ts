import axios from 'axios';

export const getExampleTasks = async () => {
  const response = await axios.get(
    '/todo-list-react/exampleTasks.json',
  );
  if (response.statusText !== 'OK') {
    new Error(response.statusText);
  }
  return response.data;
};
