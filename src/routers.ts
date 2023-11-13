export const toTasks = () => '/tasks';
export const toAutor = () => '/author';
export const toTask = ({ id } = { id: ':id' }) =>
  `/task/${id}`;
