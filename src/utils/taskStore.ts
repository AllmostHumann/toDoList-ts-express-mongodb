import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getTasksFromLocalStorage } from './localStorage';

interface Task {
  id: string;
  content: string;
  done: boolean;
}

interface TasksState {
  tasks: Task[];
  hideDone: boolean;
  loading: boolean;
  allTasksDone: boolean;
  allTasksEmpty: boolean;
}

interface TasksStore extends TasksState {
  addTask: (task: Task) => void;
  toggleHideDone: () => void;
  toggleTaskDone: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  setAllDone: () => void;
  setTasks: (tasks: Task[]) => void;
  exampleTasks: () => void;
  exampleTasksError: () => void;
  exampleTasksSuccess: (tasks: Task[]) => void;
  areAllTasksDone: (tasks: Task[]) => boolean;
  areAllTasksEmpty: (tasks: Task[]) => boolean;
  getTasksFromLocalStorage: () => void;
  getTaskById: (
    taskId: string | undefined,
    tasks: Task[],
  ) => Task | undefined;
  selectTaskByQuery: (
    query: string | null,
    tasks: Task[],
  ) => Task[];
}

const useTasksStore = create<TasksStore>()(
  devtools((set) => ({
    tasks: [],
    hideDone: false,
    loading: false,
    allTasksDone: false,
    allTasksEmpty: false,
    addTask: (task) =>
      set((state) => ({ tasks: [...state.tasks, task] })),
    toggleHideDone: () =>
      set((state) => ({ hideDone: !state.hideDone })),
    toggleTaskDone: (taskId) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, done: !task.done }
            : task,
        ),
      })),
    removeTask: (taskId) =>
      set((state) => ({
        tasks: state.tasks.filter(
          (task) => task.id !== taskId,
        ),
      })),
    setAllDone: () =>
      set((state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          done: true,
        })),
      })),
    setTasks: (tasks) => set({ tasks, loading: false }),
    exampleTasks: () => set({ loading: true }),
    exampleTasksError: () => set({ loading: false }),
    exampleTasksSuccess: (tasks) =>
      set({ tasks, loading: false }),
    areAllTasksDone: (tasks) =>
      tasks.every((task) => task.done),
    areAllTasksEmpty: (tasks) =>
      tasks.every((task) => task.content.length === 0),
    getTaskById: (taskId, tasks) =>
      tasks.find((task) => task.id === taskId),
    getTasksFromLocalStorage: () => {
      const tasks = getTasksFromLocalStorage();
      set({ tasks });
    },
    selectTaskByQuery: (query, tasks) => {
      if (!query || query.trim() === '') {
        return tasks;
      }
      return tasks.filter(({ content }) =>
        content
          .toUpperCase()
          .includes(query.trim().toUpperCase()),
      );
    },
  })),
);

export default useTasksStore;
