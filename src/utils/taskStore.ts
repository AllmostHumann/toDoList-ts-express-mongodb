import { create } from 'zustand';
import {
  devtools,
  persist,
  createJSONStorage,
} from 'zustand/middleware';
// import { getTasksFromLocalStorage } from './localStorage';
import { getExampleTasks } from './getExampleTasks';

interface Task {
  id: string;
  content: string;
  done: boolean;
}

interface TasksState {
  tasks: Task[];
  hideDone: boolean;
  loading: boolean;
}

interface TasksStore extends TasksState {
  addTask: (task: Task) => void;
  toggleHideDone: () => void;
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
  setAllTasksDone: () => void;
  setTasks: (tasks: Task[]) => void;
  areAllTasksDone: (tasks: Task[]) => boolean;
  areTasksListEmpty: (tasks: Task[]) => boolean;
  getTaskById: (
    id: string | undefined,
    tasks: Task[],
  ) => Task | undefined;
  selectTaskByQuery: (
    query: string | null,
    tasks: Task[],
  ) => Task[];
  getExampleTasks: () => Promise<void>;
}

const useTasksStore = create<TasksStore>()(
  persist(
    devtools((set) => ({
      tasks: [],
      hideDone: false,
      loading: false,
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      toggleHideDone: () =>
        set((state) => ({ hideDone: !state.hideDone })),
      toggleTaskDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, done: !task.done }
              : task,
          ),
        })),
      setAllTasksDone: () =>
        set((state) => {
          const allTasksDone = state.tasks.every(
            (task) => task.done,
          );
          const tasks = state.tasks.map((task) => ({
            ...task,
            done: allTasksDone ? false : true,
          }));
          return { tasks };
        }),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id,
          ),
        })),

      setTasks: (tasks) => set({ tasks, loading: false }),
      getExampleTasks: async () => {
        try {
          set({ loading: true });
          await new Promise((resolve) =>
            setTimeout(resolve, 500),
          );
          const exampleTaks = await getExampleTasks();
          set({ tasks: exampleTaks });
        } catch (error) {
          console.error('Something went wrong :(', error);
        } finally {
          set({ loading: false });
        }
      },
      areAllTasksDone: (tasks) =>
        tasks.every((task) => task.done),
      areTasksListEmpty: (tasks) =>
        tasks.every((task) => task.content.length === 0),
      getTaskById: (id, tasks) =>
        tasks.find((task) => task.id === id),
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
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTasksStore;
