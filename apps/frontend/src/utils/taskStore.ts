import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { TaskResult } from '../api/types/task';

interface TasksState {
  tasks: TaskResult[];
  hideDone: boolean;
}

interface TasksStore extends TasksState {
  // addTask: (task: TaskResult) => void;
  // removeTask: (_id: string) => void;
  setTasks: (tasks: TaskResult[]) => void;
  // setAllTasksDone: () => void;
  // toggleTaskDone: (_id: string) => void;
  toggleHideDoneTasks: () => void;
  // getTaskById: (_id: string, tasks: TaskResult[]) => TaskResult;
  // getTaskByQuery: (query: string | null, tasks: TaskResult[]) => TaskResult[];
  areAllTasksDone: (tasks: TaskResult[]) => boolean;
  areTasksListEmpty: (tasks: TaskResult[]) => boolean;
  // getExampleTasks: () => Promise<void>;
}

const useTasksStore = create<TasksStore>()(
  persist(
    devtools((set) => ({
      tasks: [],
      hideDone: false,
      setTasks: (tasks) => set({ tasks }),
      toggleHideDoneTasks: () =>
        set((state) => ({ hideDone: !state.hideDone })),
      areAllTasksDone: (tasks) => tasks.every((task) => task.done),
      areTasksListEmpty: (tasks) =>
        tasks.every((task) => task.content.length === 0),
      // addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      // removeTask: (_id) =>
      //   set((state) => ({
      //     tasks: state.tasks.filter((task) => task._id !== _id),
      //   })),
      // setAllTasksDone: () =>
      //   set((state) => {
      //     const allTasksDone = state.tasks.every((task) => task.done);
      //     const tasks = state.tasks.map((task) => ({
      //       ...task,
      //       done: allTasksDone ? false : true,
      //     }));
      //     return { tasks };
      //   }),
      // toggleTaskDone: (id) =>
      //   set((state) => ({
      //     tasks: state.tasks.map((task) =>
      //       task._id === id ? { ...task, done: !task.done } : task,
      //     ),
      //   })),
      // getTaskById: (_id, tasks) => tasks.find((task) => task._id === _id),
      // getTaskByQuery: (query, tasks) => {
      //   if (!query || query.trim() === '') {
      //     return tasks;
      //   }
      //   return tasks.filter(({ content }) =>
      //     content.toUpperCase().includes(query.trim().toUpperCase()),
      //   );
      // },
      // getExampleTasks: async () => {
      //   try {
      //     set({ loading: true });
      //     await new Promise((resolve) => setTimeout(resolve, 500));
      //     const exampleTaks = await getExampleTasks();
      //     set({ tasks: exampleTaks });
      //   } catch (error) {
      //     console.error('Something went wrong :(', error);
      //   } finally {
      //     set({ loading: false });
      //   }
      // },
    })),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTasksStore;
