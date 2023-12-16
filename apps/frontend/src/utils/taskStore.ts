import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { Task } from '../api/types/task';
import { getExampleTasks } from './getExampleTasks';

interface TasksState {
  tasks: Task[];
  hidden: boolean;
  loading: boolean;
  newTaskContent: string;
  edit: boolean;
  newUserName: string;
  newUserEmail: string;
  newUserPassword: string;
  loginUserName: string;
  loginUserPassword: string;
  showSignupModal: boolean;
  showLoginModal: boolean;
}

interface TasksStore extends TasksState {
  addTask: (task: Task) => void;
  setEdit: (edit: boolean) => void;
  removeTask: (_id: string) => void;
  getExampleTasks: () => Promise<void>;
  getTaskById: (
    _id: string | undefined,
    tasks: Task[] | undefined,
  ) => Task | undefined;
  getTaskByQuery: (query: string | null, tasks: Task[]) => Task[];
  setNewTaskContent: (content: string) => void;
  updateTaskContent: (_id: string, newContent: string) => void;
  setNewUsername: (newLogin: string) => void;
  setNewUserEmail: (newEmail: string) => void;
  setNewUserPassword: (newPassword: string) => void;
  setLoginUserName: (login: string) => void;
  setLoginUserPassword: (password: string) => void;
  setTaskDone: (_id: string) => void;
  setAllTasksDone: () => void;
  toggleHideDoneTasks: () => void;
  areAllTasksDone: (tasks: Task[] | undefined) => boolean;
  areTasksListEmpty: (tasks: Task[] | undefined) => boolean;
  setShowSignupModal: (showSignupModal: boolean) => void;
  setShowLoginModal: (showLoginModal: boolean) => void;
}

const useTasksStore = create<TasksStore>()(
  persist(
    devtools((set) => ({
      tasks: [],
      hidden: false,
      loading: false,
      newTaskContent: '',
      edit: false,
      newUserName: '',
      newUserEmail: '',
      newUserPassword: '',
      loginUserName: '',
      loginUserPassword: '',
      showSignupModal: false,
      showLoginModal: false,
      setShowSignupModal: (showSignupModal) => set({ showSignupModal }),
      setShowLoginModal: (showLoginModal) => set({ showLoginModal }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      setEdit: (edit) => set({ edit }),
      removeTask: (_id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== _id),
        })),
      getExampleTasks: async () => {
        try {
          set({ loading: true });
          await new Promise((resolve) => setTimeout(resolve, 500));
          const exampleTaks = await getExampleTasks();
          set({ tasks: exampleTaks });
        } catch (error) {
          console.error('Something went wrong :(', error);
        } finally {
          set({ loading: false });
        }
      },
      getTaskById: (_id, tasks) =>
        tasks && tasks.find((task) => task._id === _id),
      getTaskByQuery: (query, tasks) => {
        if (!query || query.trim() === '') {
          return tasks;
        }
        return tasks.filter(({ content }) =>
          content.toUpperCase().includes(query.trim().toUpperCase()),
        );
      },
      setNewTaskContent: (content) => set({ newTaskContent: content }),
      updateTaskContent: (_id, newContent) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task._id === _id ? { ...task, content: newContent } : task,
          );
          return { tasks: updatedTasks };
        });
      },
      setNewUsername: (newLogin) => set({ newUserName: newLogin }),
      setNewUserEmail: (newEmail) => set({ newUserEmail: newEmail }),
      setNewUserPassword: (newPassword) =>
        set({ newUserPassword: newPassword }),
      setLoginUserName: (login) => set({ loginUserName: login }),
      setLoginUserPassword: (password) => set({ loginUserPassword: password }),
      setTaskDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, done: !task.done } : task,
          ),
        })),
      setAllTasksDone: () =>
        set((state) => {
          const allTasksDone = state.tasks.every((task) => task.done);
          const tasks = state.tasks.map((task) => ({
            ...task,
            done: allTasksDone ? false : true,
          }));
          return { tasks };
        }),
      toggleHideDoneTasks: () => set((state) => ({ hidden: !state.hidden })),
      areAllTasksDone: (tasks) => tasks! && tasks.every((task) => task.done),
      areTasksListEmpty: (tasks) =>
        tasks! && tasks.every((task) => task.content.length === 0),
    })),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTasksStore;
