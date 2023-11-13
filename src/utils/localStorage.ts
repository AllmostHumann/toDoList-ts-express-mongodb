const localStorageKey = 'tasks';

interface Task {
  id: string;
  content: string;
  done: boolean;
}

export const saveTasksInLocalStorage = (
  tasks: Task[],
): void => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(tasks),
  );
};

export const getTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(localStorageKey);
  return storedTasks ? JSON.parse(storedTasks) : [];
};
